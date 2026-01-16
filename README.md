
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

## License

**Copyright © 2025 Qodet. All rights reserved.**

This project is proprietary software belonging to Qodet. Unauthorized copying, modification, distribution, or use of this software, in whole or in part, is strictly prohibited without the express written permission of Qodet. This software is not open source and is not available under the MIT license.
