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
- Migrated from GitHub import to Replit
- Configured Vite to use port 5000 with 0.0.0.0 host
- Set up workflow for automatic development server startup
- Configured deployment settings for Replit autoscale
- Installed all npm dependencies
