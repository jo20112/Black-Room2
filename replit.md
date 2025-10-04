# Overview

This is an Arabic-first personality assessment platform built with React, Express, and PostgreSQL. The application offers multiple personality tests including the Big Five personality assessment and alternative tests exploring different psychological aspects (dark side, cunning side, good side, mysterious side, and zodiac analysis). The platform features a horror/mysterious aesthetic with dark mode theming, immersive audio effects, and animated backgrounds.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: Radix UI primitives with shadcn/ui component library, configured for the "new-york" style variant

**Styling Approach**: 
- Tailwind CSS with custom design system
- Dark mode as the default and primary theme
- RTL (right-to-left) layout for Arabic language support
- Custom color palette with HSL-based theming system
- Material Design inspired components combined with personality assessment UX patterns

**State Management**: 
- React useState and useReducer for local component state
- TanStack Query (React Query) for server state management and data fetching
- Custom hooks for reusable logic (mobile detection, toast notifications)

**Routing**: Wouter for lightweight client-side routing

**Key Features**:
- Multi-test system supporting different personality assessment types
- Immersive audio using Web Audio API for ambient sound generation
- Canvas-based animated particle backgrounds
- Radar chart visualizations for test results
- Progressive test flow: Login → Test Selection → Questions → Results
- Form validation using react-hook-form with Zod schemas

## Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful API pattern with the following endpoints:
- POST /api/users - User creation and login
- POST /api/users/:id/upload-profile - Profile image upload
- POST /api/test-results - Store test results
- GET /api/users/:id/test-results - Retrieve user's test history

**File Upload Handling**: Multer middleware for profile image uploads with validation for image types and 5MB size limit

**Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)

**Development Features**:
- Request/response logging middleware
- Vite integration for HMR in development
- Error handling middleware

## Data Storage

**Database**: PostgreSQL accessed via Neon serverless driver with WebSocket support

**ORM**: Drizzle ORM for type-safe database operations

**Schema Design**:
- `users` table: id, name, age, profile_image, created_at
- `test_results` table: id, user_id, test_type, scores (JSONB), ai_interpretation, completed_at

**Migration Strategy**: Drizzle Kit for schema migrations with push-based deployment

**Data Models**:
- Type-safe schemas using Drizzle Zod integration
- JSONB storage for flexible test score structures
- Support for multiple test types with different scoring systems

## External Dependencies

**Database Service**: Neon Serverless PostgreSQL with WebSocket connection pooling

**UI Component Libraries**:
- Radix UI for accessible, unstyled primitives (accordion, dialog, dropdown, etc.)
- Framer Motion for animations (intro sequence, transitions)
- Recharts for chart visualizations

**Typography**: 
- IBM Plex Sans Arabic (Google Fonts) for Arabic text
- JetBrains Mono for numerical displays

**Development Tools**:
- Replit-specific plugins (cartographer, dev banner, runtime error overlay)
- ESBuild for production builds
- PostCSS with Autoprefixer for CSS processing

**Testing Framework**: The question banks are modular and support multiple test types with different trait mappings (Big Five, Dark Triad variants, zodiac-based assessments)

**AI Integration Placeholder**: Test results include an `aiInterpretation` field for future AI-powered personality analysis