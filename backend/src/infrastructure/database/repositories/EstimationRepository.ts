// ==========================================
// ESTIMATION REPOSITORY IMPLEMENTATION
// ==========================================

import { PrismaClient, Estimation } from '@prisma/client';

export interface IEstimationRepository {
  create(data: {
    refCode: string;
    userId?: string;
    config: any;
    costLow: number;
    costHigh: number;
    pdfUrl?: string;
  }): Promise<Estimation>;
  findByRefCode(refCode: string): Promise<Estimation | null>;
  findById(id: string): Promise<Estimation | null>;
  findByUserId(userId: string): Promise<Estimation[]>;
  findLast(): Promise<Estimation | null>;
}

export class EstimationRepository implements IEstimationRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    refCode: string;
    userId?: string;
    config: any;
    costLow: number;
    costHigh: number;
    pdfUrl?: string;
  }): Promise<Estimation> {
    return this.prisma.estimation.create({ data });
  }

  async findByRefCode(refCode: string): Promise<Estimation | null> {
    return this.prisma.estimation.findUnique({ where: { refCode } });
  }

  async findById(id: string): Promise<Estimation | null> {
    return this.prisma.estimation.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Estimation[]> {
    return this.prisma.estimation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findLast(): Promise<Estimation | null> {
    return this.prisma.estimation.findFirst({
      orderBy: { createdAt: 'desc' }
    });
  }
}

