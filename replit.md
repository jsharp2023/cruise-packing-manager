Cruise Packing List Manager
Overview
This is a full-stack web application for creating and managing cruise packing lists. The application helps users organize their packing by providing structured categories for clothing, toiletries, electronics, and documents, with features like custom item addition, quantity tracking, and cruise-specific details. Built with React frontend and Express backend, it uses modern web technologies to provide a responsive and user-friendly packing experience.

Recent Changes
Added weather prediction feature that searches historical weather data based on travel dates and destinations to help users pack appropriately
Integrated weather API with historical patterns for popular cruise destinations (Caribbean, Mediterranean, Alaska, Norway, etc.)
Created WeatherDisplay component showing temperature forecasts, seasonal conditions, and weather-based packing recommendations
Enhanced mobile-responsive design with theme customization system (Ocean Blue, Sunset Cruise, Tropical Paradise, Elegant Navy)
Implemented mobile header with hamburger menu and theme selector for optimal mobile experience
Enhanced weather predictions with detailed clothing suggestions organized by category (tops, bottoms, outerwear, footwear, accessories)
Added weather-specific essentials recommendations (sunscreen, thermal items, rain gear, etc.)
Created comprehensive documentation and repository setup files for GitHub deployment
User Preferences
Preferred communication style: Simple, everyday language. Mobile-friendly design: Application should work well on both mobile and desktop devices. Theme customization: Users can choose from multiple color themes (Ocean Blue, Sunset Cruise, Tropical Paradise, Elegant Navy).

System Architecture
Frontend Architecture
Framework: React with TypeScript using Vite as the build tool
UI Library: Shadcn/ui components built on Radix UI primitives
Styling: Tailwind CSS with custom theme variables and design tokens
Theme System: Context-based theme provider with CSS custom properties for dynamic theme switching
Responsive Design: Mobile-first approach with responsive breakpoints and adaptive layouts
State Management: React Hook Form for form state, TanStack Query for server state
Routing: Wouter for lightweight client-side routing
Component Structure: Modular component design with reusable UI components in /components/ui/ and feature-specific components in /components/
Backend Architecture
Framework: Express.js with TypeScript
API Design: RESTful endpoints for CRUD operations on packing lists
Data Storage: Currently uses in-memory storage with MemStorage class, designed with interface pattern to easily swap for database implementation
Middleware: Request logging, JSON parsing, CORS handling, and error handling
Development Setup: Vite integration for hot module replacement in development
Data Layer
Schema: Drizzle ORM with PostgreSQL schema definitions
Database: PostgreSQL (Neon Database) configured but not yet implemented in storage layer
Validation: Zod schemas for runtime type validation and form validation
Data Models: Structured packing items with categories, quantities, custom items, and cruise details
External Dependencies
Database Provider: Neon Database (PostgreSQL serverless)
Weather Data: Custom historical weather patterns API for cruise destinations
UI Framework: Radix UI for accessible component primitives
Validation: Zod for schema validation and type safety
Build Tools: Vite for frontend bundling, esbuild for backend compilation
Development: TypeScript for type safety across the entire stack
CSS Framework: Tailwind CSS with PostCSS for styling
Icons: Lucide React for consistent iconography
The application follows a clear separation of concerns with shared types and schemas between frontend and backend, making it easy to maintain and extend. The storage layer is abstracted to allow for easy migration from in-memory to database storage when needed.