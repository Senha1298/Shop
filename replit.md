# E-commerce Product Page

## Overview

This is a mobile-first e-commerce product page application that replicates a Shopee/marketplace-style shopping interface. The application features a product showcase page with image carousel, pricing information, offers, reviews, and an integrated checkout flow with PIX payment processing through the 4mpagamentos payment gateway.

The application is built as a full-stack TypeScript project with React frontend and Express backend, designed for a mobile viewport (max-width: 428px) with a focus on pixel-perfect replication of marketplace design patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for component-based UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component Library**
- Radix UI primitives for accessible, unstyled components
- Shadcn/ui design system with "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management

**Styling System**
- Custom CSS variables defined in `index.css` for theming
- TikTok font family as the primary typeface
- Mobile-first responsive design constrained to 428px viewport
- Color palette centered around brand color #F52B56 (vibrant pink/red)
- Custom Tailwind configuration with extended border radius and color schemes

**Page Structure**
- `/` - Product page with carousel, pricing, offers, reviews, and description
- `/pagamento` - Payment page displaying PIX QR code and payment status
- `/taxa` - Success page shown after payment confirmation
- `/404` - Not found page

**Key Frontend Components**
- `ImageCarousel`: Custom image carousel with navigation arrows and dot indicators
- `PriceSection`: Displays pricing, discounts, and installment options
- `OffersSection`: Coupon redemption interface
- `ReviewsSection`: Customer reviews and ratings
- `DescriptionSection`: Product description and specifications
- `CheckoutModal`: Full checkout flow with address form and fiscal data collection

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for HTTP server
- Vite middleware integration for development hot module replacement
- Custom logging middleware for API request tracking

**Storage Layer**
- In-memory storage implementation (`MemStorage`) for user data
- Storage interface designed to support CRUD operations
- Prepared for database integration (Drizzle ORM configuration present)

**API Design**
- RESTful API structure with `/api` prefix
- Centralized error handling middleware
- Session-based architecture prepared (though not fully implemented)

### Data Storage Solutions

**Database Configuration (Prepared but Not Active)**
- Drizzle ORM configured for PostgreSQL
- Neon serverless PostgreSQL driver integrated
- Schema defined in `shared/schema.ts` with users table
- Zod integration for schema validation
- Migration directory: `./migrations`

**Current Storage**
- Memory-based storage for development
- User entity with id, username, and password fields
- UUID generation for user IDs

### External Dependencies

**Payment Gateway Integration**
- 4mpagamentos PIX payment API
- Base URL: `https://app.4mpagamentos.com/api/v1`
- API Key: `3mpag_p7czqd3yk_mfr1pvd2` (Bearer token authentication)
- Payment creation endpoint: `POST /payments`
- Payment status checking: `GET /payments/{transaction_id}`
- Polling mechanism: Status checks every 1-5 seconds for payment confirmation
- Success redirect flow to `/taxa` page upon payment confirmation

**Third-Party Services**
- ViaCEP API for Brazilian postal code lookup (implied by address form with CEP field)
- Font Awesome 5.15.3 for icons
- Google Fonts for Inter font family (referenced in design guidelines)

**Development Tools**
- Replit-specific plugins for runtime error overlay and dev tools
- ESBuild for production builds
- PostCSS with Autoprefixer for CSS processing

**UI Component Libraries**
- 30+ Radix UI primitives (accordion, dialog, dropdown, select, etc.)
- Embla Carousel React for carousel functionality
- CMDK for command palette components
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation
- Lucide React for additional icons

### Authentication & Authorization

**Current State**
- Basic user schema defined with username/password
- No active authentication implementation
- Session infrastructure prepared (connect-pg-simple imported)
- Storage interface includes user creation and retrieval methods

### Design System

**Brand Colors**
- Primary: `#F52B56` (vibrant pink/red)
- Secondary backgrounds: `#FDE5EA` (light pink)
- Neutral: Black (#000000), gray (#757575), border gray (#e0e0e0)
- Accents: Gold star rating (#ffb400), light background (#f5e6d6)

**Typography**
- Primary font: TikTok (custom font loaded via woff2)
- Fallback: Inter from Google Fonts
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Precise sizing using Tailwind's arbitrary values

**Layout Constraints**
- Maximum container width: 428px
- Mobile-first, single-viewport design
- Fixed header with sticky positioning
- Scroll area optimizations (hidden scrollbars)