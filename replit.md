# TinySteps - AI-Powered Productivity App

## Project Overview
TinySteps is a productivity application designed to help people who struggle with traditional productivity apps. It turns overwhelming projects into tiny, manageable steps with AI-powered guidance. Built specifically for people with ADHD and those who find traditional task management overwhelming.

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Library**: shadcn/ui with Radix UI components
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query v5)
- **Backend**: Supabase (Authentication & Database)
- **Form Handling**: React Hook Form with Zod validation

## Project Structure
- `/src` - Main application source code
  - `/pages` - Page components (Landing, Index, Auth, NotFound)
  - `/components` - Reusable components including UI components
  - `/integrations/supabase` - Supabase client and types
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions
  - `/types` - TypeScript type definitions
- `/public` - Static assets
- `/supabase` - Supabase configuration and migrations

## Development Setup
The project is configured to run in the Replit environment:
- **Dev Server**: Runs on port 5000 with host 0.0.0.0
- **Workflow**: `npm run dev` starts the Vite development server
- **Build Command**: `npm run build`
- **Preview Command**: `npm run preview`

## Deployment Configuration
- **Target**: Autoscale deployment
- **Build**: `npm run build`
- **Run**: `npm run preview`

## Key Features
- AI-powered task breakdown
- Focus timer with break reminders
- Voice recording for task input
- Speech recognition support
- Progress dashboard
- Theme toggle (light/dark mode)
- Supabase authentication

## Environment Notes
- Vite is configured for Replit's proxy environment
- HMR (Hot Module Replacement) is enabled
- Base path is set to "/" for development and production
- The app uses Supabase for backend services with pre-configured credentials

## Recent Changes (Sept 30, 2025)

### Initial Setup
- Migrated from GitHub import to Replit
- Configured Vite to use port 5000 with 0.0.0.0 host
- Set up workflow for automatic development server startup
- Configured deployment settings for Replit autoscale
- Installed all npm dependencies

### UX Improvements: Onboarding & Simplified Task Creation (Latest)
- **Guided Onboarding Wizard**: 3-step wizard with inline 5-minute focus timer
  - Step 1: Try a quick focus session with embedded timer (pause/resume/skip controls)
  - Step 2: Celebrate completion and introduce AI features
  - Step 3: Show benefits and complete onboarding
  - Reduces cognitive load with one step at a time
- **Simplified Task Creation**: Replaced complex multi-panel UI with clean, focused interface
  - Single input field with smart defaults (25-min Pomodoro)
  - Large touch targets for mobile (48px+)
  - Quick starter suggestions for common tasks
  - Removed visual noise and distractions
  - ADHD-friendly progressive disclosure
- Fixed GitHub Pages deployment (base path configured for /tinysteps/)

### Data Persistence Migration
- **Created useSupabaseData hook**: Replaced all localStorage usage with real Supabase database persistence
  - Tasks now saved to `tasks` table
  - Focus sessions saved to `focus_sessions` table
  - User stats tracked in `user_stats` table
  - Proper error handling and loading states
- **Removed all fake analytics**: Completely rewrote ProgressDashboard to use real data from Supabase instead of Math.random()
  - Real completion rate calculations
  - Actual focus time tracking
  - Genuine streak calculations
  - Historical data from database
- **Updated FocusTimer**: Now saves completed sessions to Supabase with proper error handling
- **AI Integration**: OpenAI API key configured via Replit Secrets for task breakdown and coaching features

### Accessibility & UX Improvements
- Added comprehensive ARIA labels and semantic HTML across components
- Added data-testid attributes for all interactive elements
- Improved loading states with skeletons and spinners
- Enhanced error handling with user-friendly toast notifications
- Mobile-responsive design for ProgressDashboard
- Better keyboard navigation support

### Security & Error Handling
- AuthGuard properly prevents unauthenticated access
- Graceful error handling in all Supabase operations
- Proper auth state management with loading states
- User-friendly error messages throughout the app

## Recent Changes (Oct 1, 2025)

### Button Visibility & Dark Mode Fixes
- **Fixed all button visibility issues**: Updated button component variants to ensure proper contrast
  - Ghost buttons: Added `text-foreground` for dark text visibility
  - Link buttons: Changed to `text-foreground` for consistent visibility
  - Border colors: Strengthened from 89.8% to 55% lightness (≥3:1 WCAG contrast)
  - Orange accents: Updated to orange-600 for proper visibility on light backgrounds
- **WCAG AAA compliance**: All UI elements now meet accessibility standards in both light and dark modes
- **Dark mode gradients**: Fixed gradient definitions in .dark class for proper theming

### GitHub Pages Deployment Fix
- **Added SPA routing support**: Implemented spa-github-pages solution for React Router on GitHub Pages
  - Created `public/404.html` with redirect script
  - Added redirect handler to `index.html`
  - Added `.nojekyll` file to prevent Jekyll processing
- **Base path configuration**: Vite configured with `/tinysteps/` base for production builds
- **Automatic deployment**: GitHub Actions workflow deploys on push to main branch
