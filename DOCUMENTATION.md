
# Component Documentation: Cards

This document outlines the various card components used throughout the Qodet application, detailing their purpose, content structure, and visual style.

## 1. Hero Cards (`HeroSection.tsx`)
*   **Purpose**: The central focal point of the landing page, introducing the brand's value proposition.
*   **Content**: "Transform Ideas into Reality" heading, subtitle, and CTA buttons ("Get Started", "Have A Quick Demo").
*   **Style**: Glassmorphic background (`bg-[rgba(16,16,16,0.40)]` with blur), rounded corners, centered text. It floats above the animated Green Squares background.

## 2. Service Cards (`CustomSolutionsSection.tsx`)
*   **Purpose**: To display the core services offered (AI, Web/App, API, UI/UX).
*   **Content**: 
    *   **AI-Powered Development**: Large featured card with AI circuit graphic.
    *   **Web & App Development**: Horizontal card with Monitor/Phone graphic.
    *   **API Development**: Smaller card with Cloud/Nodes graphic.
    *   **UI/UX Design**: Smaller card with Pen Tool graphic.
*   **Style**: Dark/Green thematic backgrounds. The AI card uses a prominent green background (`#1c6339`), while others use dark variants (`#1e2422`, `#20332d`, `#242424`). All feature hover lift effects and custom SVG illustrations.

## 3. Value Proposition Cards (`WhyChooseQodetSection.tsx`)
*   **Purpose**: To highlight key differentiators (Transparency, Accountability, Efficiency).
*   **Content**: Title, description, and large abstract animated SVG graphics (Blocks, Checkmarks, Bars).
*   **Style**: Vertical rectangular cards with glassmorphic overlay on the bottom half content area. The top half features the graphic with a blurred background effect.

## 4. Success Story Cards (`SuccessStoriesSection.tsx`)
*   **Purpose**: To showcase case studies and past work.
*   **Content**: Title, description, category tag ("Case Study", "Blog"), and a large masked image area.
*   **Style**: Glassmorphic container with a unique SVG mask applied to the image area (`clip-path`). Includes a floating action button on the image.

## 5. Estimation Result Card (`CalculatorSection.tsx` & `DetailedCalculator.tsx`)
*   **Purpose**: To display the real-time calculated cost estimation.
*   **Content**: Total estimated cost, currency selector, breakdown (Base + Additional), and CTA buttons ("Contact Us", "Download").
*   **Style**: High-contrast card with a dark body and a bright green footer area for the final total.

## 6. Product Cards (`ProductShowcase.tsx`)
*   **Purpose**: To display the SaaS products available.
*   **Content**: Product title, description, category badge, icon, tags, and an image carousel that auto-plays on hover.
*   **Style**: Glassmorphic border card (`border-white/10`). The top media area switches from an Icon view to an Image Carousel view on hover.

## 7. Blog Post Cards (`BlogsPage.tsx`)
*   **Purpose**: To preview blog articles or resources.
*   **Content**: 
    *   **Header**: Author info (avatar, name, role) and date.
    *   **Body**: Title, excerpt, category badge, and tags.
    *   **Media**: Large cover image.
    *   **Footer**: Social stats (likes, comments) and save button.
*   **Style**: Social-media style feed card. Dark background (`#242424`), rounded corners, interactive action bar at the bottom.

## 8. Dashboard KPI Cards (`DashboardPage.tsx`)
*   **Purpose**: To show high-level metrics on the user dashboard.
*   **Content**: Title (e.g., "Project Status", "Overall Progress"), main metric/graphic (progress bar, status dot), and subtext.
*   **Style**: Small, compact cards (`p-5`) with dark backgrounds (`#242424`) and subtle border interactions.

## 9. Recent Activity Card (`DashboardPage.tsx`)
*   **Purpose**: To list the latest system events.
*   **Content**: List of items with icons, text, and timestamps connected by a vertical timeline line.
*   **Style**: Larger container card holding a vertical list.

## 10. Start Project Card (`DashboardPage.tsx`)
*   **Purpose**: Primary Call-to-Action for the dashboard.
*   **Content**: "Start New Project" text, Plus icon, "Create Brief" button.
*   **Style**: Distinctive visual style using a gradient background (`from-[#00F866] to-[#00885A]`) and a "lift-off" 3D hover effect revealing a darker layer underneath.

## 11. Team/Founder Cards (`AboutUsSection.tsx`)
*   **Purpose**: To introduce team members.
*   **Content**: Large portrait image, name overlay, role, bio (for founders), and social links.
*   **Style**: Image-heavy cards. Founders use a large overlay style with text at the bottom. Team members use a standard vertical card with image top and text bottom.

## 12. Contact Card (`ContactUsSection.tsx`)
*   **Purpose**: To display contact information.
*   **Content**: Email, Phone, Office address with icons.
*   **Style**: Bento-grid style tile containing individual list items for each contact method.
