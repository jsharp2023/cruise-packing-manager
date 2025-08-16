VS Code Setup Guide for Cruise Packing Manager
This guide will walk you through setting up the Cruise Packing Manager project in VS Code from scratch.

Prerequisites
Node.js 18+: Download from nodejs.org
VS Code: Download from code.visualstudio.com
Git: Download from git-scm.com
Step 1: Clone or Download the Project
Option A: Clone from GitHub (if you created the repository)
git clone https://github.com/YOURUSERNAME/cruise-packing-manager.git
cd cruise-packing-manager
Option B: Create from Replit Export
Download all files from your Replit project
Create a new folder called cruise-packing-manager
Copy all files into this folder
Step 2: Open in VS Code
Open VS Code
File → Open Folder
Select your cruise-packing-manager folder
Click "Select Folder"
Step 3: Install Dependencies
Open the VS Code terminal (Terminal → New Terminal) and run:

npm install
This will install all the dependencies listed in package.json:

Frontend Dependencies
React 18 with TypeScript
Vite for development and building
Tailwind CSS for styling
Shadcn/ui components
TanStack Query for data fetching
React Hook Form for forms
Wouter for routing
Lucide React for icons
Backend Dependencies
Express.js with TypeScript
Drizzle ORM for database
Zod for validation
Node.js types
Step 4: Install Recommended VS Code Extensions
Install these extensions for the best development experience:

TypeScript and JavaScript:

ES7+ React/Redux/React-Native snippets
TypeScript Importer
Tailwind CSS:

Tailwind CSS IntelliSense
General Development:

Prettier - Code formatter
ESLint
Auto Rename Tag
Bracket Pair Colorizer
To install extensions:

Click the Extensions icon in VS Code sidebar (Ctrl+Shift+X)
Search for each extension name
Click "Install"
Step 5: Configure VS Code Settings
Create .vscode/settings.json in your project root:

{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
Step 6: Start Development Server
In VS Code terminal, run:

npm run dev
This will:

Start the Express backend on port 5000
Start the Vite frontend development server
Open your browser to the application
Enable hot reload for development
Step 7: Project Structure Overview
Your VS Code file explorer should show:

cruise-packing-manager/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # Theme provider
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities
│   │   ├── pages/         # App pages
│   │   └── App.tsx        # Main component
│   └── index.html
├── server/                # Backend Express app
│   ├── index.ts          # Server entry
│   ├── routes.ts         # API routes + weather
│   ├── storage.ts        # Data storage
│   └── vite.ts           # Vite integration
├── shared/               # Shared schemas
│   └── schema.ts         # Types and validation
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
└── README.md             # Documentation
Step 8: Development Workflow
Making Changes
Edit files in VS Code
Save changes (Ctrl+S)
Browser automatically refreshes with updates
Check terminal for any errors
Key Files to Understand
client/src/pages/cruise-packing.tsx - Main packing list page
client/src/components/WeatherDisplay.tsx - Weather prediction component
server/routes.ts - API endpoints including weather data
shared/schema.ts - Data types and validation
Available Scripts
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
Step 9: Environment Setup (Optional)
If you want to use a real database:

Copy .env.example to .env
Add your PostgreSQL connection string:
DATABASE_URL=postgresql://username:password@localhost:5432/cruise_packing
Troubleshooting
Common Issues:
Port already in use:

Kill other processes on port 5000
Or change port in vite.config.ts
Dependencies not installing:

Delete node_modules folder
Delete package-lock.json
Run npm install again
TypeScript errors:

Restart VS Code TypeScript service: Ctrl+Shift+P → "TypeScript: Restart TS Server"
Tailwind not working:

Make sure Tailwind CSS IntelliSense extension is installed
Check tailwind.config.ts paths are correct
Getting Help
Check the terminal for error messages
Use VS Code's built-in debugging tools
Refer to README.md for detailed documentation
Next Steps
Once everything is running:

Test the weather prediction feature
Try different themes
Test mobile responsiveness
Explore the codebase
Make your first changes
You're now ready to develop and enhance the Cruise Packing Manager! 🚢