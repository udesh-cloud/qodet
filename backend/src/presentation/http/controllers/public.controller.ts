// ==========================================
// PUBLIC CONTROLLER
// ==========================================

import { Request, Response, NextFunction } from 'express';
import { getPrismaClient } from '../../../infrastructure/database/connection';
import { LeadRepository } from '../../../infrastructure/database/repositories/LeadRepository';
import { EstimationRepository } from '../../../infrastructure/database/repositories/EstimationRepository';
import { sendEmail } from '../../../shared/utils/email.util';
import { logger } from '../../../shared/utils/logger.util';
import { ApiResponse } from '../../../shared/types/api-response.types';

const prisma = getPrismaClient();
const leadRepo = new LeadRepository(prisma);
const estimationRepo = new EstimationRepository(prisma);

export class PublicController {
  /**
   * POST /api/v1/public/contact
   * Contact form submission
   */
  static async contact(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, phone, subject, message } = req.body;

      // Check for existing user to link user_id
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      // Insert into leads table
      const lead = await leadRepo.create({
        email,
        userId: existingUser?.id
      });

      // Also create ContactInquiry for backward compatibility
      await prisma.contactInquiry.create({
        data: {
          email,
          name: name || 'Unknown',
          phone: phone || null,
          subject: subject || null,
          message: message || 'Contact form submission'
        }
      });

      // Trigger admin email (in production, send to admin email)
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@qodet.com';
      await sendEmail({
        to: adminEmail,
        subject: `New Contact Form Submission from ${email}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Email:</strong> ${email}</p>
          ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          <p><strong>Lead ID:</strong> ${lead.id}</p>
          <p><strong>User Linked:</strong> ${existingUser ? 'Yes (existing user)' : 'No (new lead)'}</p>
        `
      });

      const response: ApiResponse = {
        success: true,
        data: {
          leadId: lead.id,
          message: 'Thank you for contacting us. We will get back to you soon.'
        },
        message: 'Contact form submitted successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/public/estimate
   * Generate project estimate with PDF
   */
  static async estimate(req: Request, res: Response, next: NextFunction) {
    try {
      const { config, userId } = req.body;

      // Calculate cost server-side (never trust client)
      // This is a simplified calculation - adjust based on your calculator logic
      const baseCost = 1000;
      const complexityMultiplier = (config.complexity || 1) * 1.5;
      const featuresMultiplier = (config.features?.length || 1) * 1.2;
      
      const costLow = Math.round(baseCost * complexityMultiplier * featuresMultiplier * 0.8);
      const costHigh = Math.round(baseCost * complexityMultiplier * featuresMultiplier * 1.2);

      // Generate unique reference code (e.g., Q-1002)
      const refCode = await generateRefCode();

      // Create estimation record
      const estimation = await estimationRepo.create({
        refCode,
        userId: userId || null,
        config,
        costLow,
        costHigh,
        pdfUrl: null // Will be set after PDF generation
      });

      // Generate PDF via Puppeteer (simplified - you'll need to install puppeteer)
      // For now, we'll create a placeholder PDF URL
      // In production, use: const pdfUrl = await generatePDF(estimation);
      const pdfUrl = `${process.env.S3_BASE_URL || 'https://s3.qodet.com'}/estimates/${estimation.id}.pdf`;
      
      // Update estimation with PDF URL
      await prisma.estimation.update({
        where: { id: estimation.id },
        data: { pdfUrl }
      });

      // Email user if email is provided in config
      if (config.email) {
        await sendEmail({
          to: config.email,
          subject: `Your Project Estimate - ${refCode}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Your Project Estimate</h1>
              <p><strong>Reference Code:</strong> ${refCode}</p>
              <p><strong>Estimated Cost Range:</strong> $${costLow.toLocaleString()} - $${costHigh.toLocaleString()}</p>
              <p>Your detailed estimate PDF is available at:</p>
              <a href="${pdfUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px;">
                Download PDF
              </a>
              <p style="margin-top: 20px; color: #666;">
                Thank you for using Qodet's estimation calculator!
              </p>
            </div>
          `
        });
      }

      const response: ApiResponse = {
        success: true,
        data: {
          refCode: estimation.refCode,
          costLow: estimation.costLow,
          costHigh: estimation.costHigh,
          pdfUrl: pdfUrl
        },
        message: 'Estimate generated successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Generate unique reference code (e.g., Q-1002)
 */
async function generateRefCode(): Promise<string> {
  const prefix = 'Q';
  const lastEstimation = await estimationRepo.findLast();

  let nextNumber = 1001;
  if (lastEstimation && lastEstimation.refCode) {
    const match = lastEstimation.refCode.match(/\d+$/);
    if (match) {
      nextNumber = parseInt(match[0]) + 1;
    }
  }

  return `${prefix}-${nextNumber}`;
}

