
# Qodet - Digital Transformation Agency

A responsive, high-performance landing page for Qodet, a digital transformation agency, built with Next.js 15, Tailwind CSS, and React 19.

## Features

- **Next.js 15 App Router**: Leveraging the latest React Server Components and routing features.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.
- **Interactive UI**: Animations using Framer Motion (Hero squares, scroll reveals, hover effects).
- **Interactive Tools**: 
  - **Estimation Calculator**: Real-time project cost estimation with multiple parameters.
  - **Product Showcase**: Filterable product ecosystem display.
- **Modern Styling**: Glassmorphism, neon accents (Green #00F866), and custom vector graphics using Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later.

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `page.tsx`: Main landing page.
  - `products/`: Products listing page.
  - `calculator/`: Detailed calculator page.
  - `library/`: Blog/Resources page.
  - `about/`: About Us page.
- `components/`: Reusable UI components.
  - `ui/`: Base UI elements (buttons, cards, badges, accordion).
  - `LandingPage.tsx`: Aggregates sections for the home page.
- `contexts/`: React Context providers (Navbar state).

## Customization

- **Colors & Fonts**: Modified in `tailwind.config.ts` and `app/globals.css`.
- **Content**: Edit individual components in the `components/` directory.

## Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import the repository: `udesh-cloud/qodet`

2. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `qodet-website-frontend` (if the repo contains multiple folders)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Environment Variables (if needed):**
   - Add any required environment variables in the Vercel dashboard
   - For this project, no environment variables are currently required

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project
   - Your site will be live at a `*.vercel.app` URL

5. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## License

**Copyright © 2025 Qodet. All rights reserved.**

This project is proprietary software belonging to Qodet. Unauthorized copying, modification, distribution, or use of this software, in whole or in part, is strictly prohibited without the express written permission of Qodet. This software is not open source and is not available under the MIT license.
