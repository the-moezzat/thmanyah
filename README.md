<div align="center">
  <h1>🎧 Thmanyah</h1>
  <p><strong>A Modern Podcast Search Platform</strong></p>
  
  <p>
    <a href="https://thmanyah-app.vercel.app">🌐 Live Demo</a> |
    <a href="#features">✨ Features</a> |
    <a href="#tech-stack">🛠 Tech Stack</a> |
    <a href="#getting-started">🚀 Getting Started</a>
  </p>

  <img src="https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/NestJS-11.0.1-red?style=for-the-badge&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Turborepo-2.5.3-orange?style=for-the-badge&logo=turborepo" alt="Turborepo" />
</div>

---

## 📖 About

**Thmanyah** is a sophisticated podcast search platform that leverages the iTunes Search API to provide users with a seamless podcast discovery experience. Built with modern web technologies and a monorepo architecture, it offers advanced search capabilities, intelligent caching, and a beautiful, responsive user interface.

### 🎯 Key Highlights

- **🔍 Smart Search**: Intelligent podcast search with caching and deduplication
- **💾 Offline-First**: Database caching for improved performance and reliability
- **🌍 Multilingual**: Full Arabic and English language support
- **🎨 Modern UI**: Beautiful, responsive design with dark/light theme support
- **⚡ High Performance**: Built with Turborepo for optimal build times and development experience
- **🔒 Type-Safe**: End-to-end TypeScript with tRPC for API safety

---

## ✨ Features

### 🔍 **Advanced Search**
- Real-time podcast search using iTunes API
- Intelligent caching system to reduce API calls
- Search history tracking
- Duplicate detection and prevention

### 📱 **User Experience**
- **Responsive Design**: Optimized for all screen sizes
- **Multiple View Modes**: Grid and list view options
- **Theme Support**: Dark and light mode toggle
- **Internationalization**: Arabic and English language support
- **Favorites System**: Save and manage favorite podcasts

### 🏗️ **Technical Excellence**
- **Monorepo Architecture**: Shared code and configurations
- **Type Safety**: Full TypeScript implementation
- **Modern Stack**: Latest versions of Next.js, NestJS, and React
- **Performance Optimized**: Smart caching and lazy loading
- **Developer Experience**: Hot reload, Storybook, and comprehensive tooling

---

## 🛠 Tech Stack

### **Frontend**
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Internationalization**: Lingui
- **Development**: Storybook for component development

### **Backend**
- **Framework**: NestJS 11.0.1
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **API**: RESTful endpoints
- **Validation**: Class validators and transformers

### **Shared Infrastructure**
- **Monorepo**: Turborepo 2.5.3
- **Package Manager**: pnpm 10.11.0
- **Linting**: Biome (ESLint + Prettier alternative)
- **Type Checking**: TypeScript strict mode
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel

### **Database Schema**
```prisma
model iTunesSearchResult {
  id                     Int       @id @default(autoincrement())
  searchTerm             String
  trackId                Int?
  artistName             String?
  trackName              String?
  collectionName         String?
  // ... additional podcast metadata
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt
}
```

---

## 🏗️ Project Structure

```
thmanyah/
├── apps/
│   ├── app/                    # Next.js frontend application
│   │   ├── app/
│   │   │   ├── (unauthenticated)/
│   │   │   │   ├── page.tsx    # Home page with search
│   │   │   │   └── search/     # Search results page
│   │   │   └── api/            # API routes
│   │   ├── middleware.ts       # Next.js middleware
│   │   └── next.config.ts      # Next.js configuration
│   ├── api/                    # NestJS backend application
│   │   └── src/
│   │       ├── itunes/         # iTunes search module
│   │       └── main.ts         # Application entry point
│   ├── storybook/              # Component development environment
│   └── studio/                 # Database studio
├── packages/
│   ├── auth/                   # Authentication package
│   ├── database/               # Prisma schema and client
│   ├── design-system/          # Shared UI components
│   ├── next-config/            # Shared Next.js configuration
│   ├── rate-limit/             # Rate limiting utilities
│   └── typescript-config/      # Shared TypeScript configurations
├── scripts/                    # Build and deployment scripts
├── turbo.json                  # Turborepo configuration
└── package.json                # Root package configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** 10.11.0 or higher
- **PostgreSQL** database (or Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/the-moezzat/thmanyah.git
   cd thmanyah
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp apps/app/.env.example apps/app/.env.local
   cp packages/database/.env.example packages/database/.env
   
   # Configure your database URL and other environment variables
   ```

4. **Set up the database**
   ```bash
   pnpm migrate
   ```

5. **Start development servers**
   ```bash
   # Start all applications in development mode
   pnpm dev
   
   # Or start individual applications
   pnpm dev --filter=app      # Frontend only
   pnpm dev --filter=api      # Backend only
   ```

### 🌐 Access the Application

- **Frontend**: http://localhost:3030
- **Backend API**: http://localhost:3000
- **Storybook**: http://localhost:6006

---

## 📝 Available Scripts

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm dev --filter=app       # Start frontend only
pnpm dev --filter=api       # Start backend only

# Building
pnpm build                  # Build all applications
pnpm build --filter=app     # Build frontend only

# Testing
pnpm test                   # Run all tests
pnpm lint                   # Lint all code
pnpm format                 # Format all code

# Database
pnpm migrate                # Run database migrations

# Utilities
pnpm clean                  # Clean all node_modules and build artifacts
pnpm bump-deps              # Update all dependencies
```

---

## 🎨 Component Development

This project uses **Storybook** for isolated component development:

```bash
# Start Storybook
cd apps/storybook
pnpm dev
```

Storybook allows you to:
- Develop components in isolation
- Test different component states
- Document component APIs
- Visual regression testing

---

## 🌍 Internationalization

The application supports multiple languages using **Lingui**:

- **Arabic** (العربية) - Primary language
- **English** - Secondary language

Language switching is available in the UI, and the application automatically detects user preferences.

---

## 🔧 Architecture Decisions

### **Monorepo Benefits**
- **Code Sharing**: Shared TypeScript configurations, UI components, and utilities
- **Consistent Tooling**: Unified linting, formatting, and testing across all packages
- **Simplified Dependencies**: Centralized dependency management
- **Build Optimization**: Turborepo's intelligent caching and parallel execution

### **Caching Strategy**
- **Database First**: Check local cache before hitting iTunes API
- **Smart Deduplication**: Prevent duplicate podcast entries
- **Performance**: Reduce API calls and improve response times
- **Reliability**: Fallback when iTunes API is unavailable

### **Type Safety**
- **End-to-End**: TypeScript from database to UI
- **Runtime Validation**: Zod schemas for API validation
- **Generated Types**: Prisma generates database types
- **Shared Schemas**: Common validation logic between frontend and backend

---

## 🚀 Deployment

The application uses a split deployment strategy:

### Frontend (Next.js App)
- **Platform**: Vercel
- **URL**: [Your Vercel deployment URL]
- **Auto-deployment**: Enabled from main branch
- **Build Command**: `pnpm build --filter=app`

### Backend (NestJS API)
- **Platform**: Railway
- **URL**: [Your Railway deployment URL]
- **Auto-deployment**: Enabled from main branch
- **Build Command**: `pnpm build --filter=api`
- **Start Command**: `pnpm start --filter=api`

### Environment Variables

#### Frontend (Vercel)
```bash
# API Configuration
NEXT_PUBLIC_API_URL="https://your-railway-api-url.railway.app"

# Authentication (if using)
AUTH_SECRET="your-auth-secret"
AUTH_GITHUB_ID="your-github-oauth-id"
AUTH_GITHUB_SECRET="your-github-oauth-secret"
```

#### Backend (Railway)
```bash
# Database
DATABASE_URL="your-postgresql-connection-string"

# Port (Railway automatically sets this)
PORT=3000

# CORS Configuration
CORS_ORIGIN="https://your-vercel-app-url.vercel.app"
```

### Production URLs
- **Live Application**: https://thmanyah-app.vercel.app
- **API Endpoints**: https://thmanyah-app.vercel.app/api

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Biome for code formatting
- Write tests for new features
- Update documentation as needed


## 🙏 Acknowledgments

- **iTunes Search API** for podcast data
- **Vercel** for hosting and deployment
- **Neon** for PostgreSQL database
- **Open Source Community** for the amazing tools and libraries

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/the-moezzat">Mohamed</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
