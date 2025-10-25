# Eternima - Digital Life Preservation Platform

## About Eternima

**Eternima** is a private, verifiable digital life preservation platform that helps users capture, reflect on, and preserve their life memories with AI-powered tools. Built with dignity and privacy as core principles, Eternima offers:

- **ETI.AI™** - Reflective Intelligence that learns how you think, feel, and act
- **LuxVault Capsule™** - Offline data vault for secure, long-term storage
- **Lumirec™** - Wearable voice recorder for hands-free memory capture
- **SoulNFT™** - Verifiable digital identity for inheritable continuity

## Project Info

**Lovable Project URL**: https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Local Development

```sh
# Clone the repository
git clone https://github.com/salmanbao/pulse-robot-template-28084.git

# Navigate to project directory
cd pulse-robot-template-28084

# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Development Workflows

### Using Lovable IDE

Visit the [Lovable Project](https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727) and start prompting. Changes made via Lovable are automatically committed to this repo.

### Using Your Local IDE

Make changes locally and push to the repository. All pushed changes are reflected in Lovable automatically.

### Using GitHub Codespaces

1. Navigate to the repository main page
2. Click the "Code" button (green button)
3. Select the "Codespaces" tab
4. Click "New codespace" to launch the environment
5. Edit files directly and commit changes when done

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **Vite** - Fast development server and build tool
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom brand design system
- **shadcn/ui** - High-quality accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **TanStack Query** - Server state management
- **React Router v6** - Client-side routing
- **Lottie React** - Complex animations
- **Lucide React** - Icon system

## 🎨 Design System

### Brand Colors

- **Primary Gold** (`#cb9b32`) - CTAs, logos, key accents
- **Secondary Brown** (`#6b5420`) - Backgrounds, containers
- **Tertiary Beige** (`#d1c8a9`) - Borders, dividers, subtle elements
- **White** (`#ffffff`) - Primary text on dark backgrounds

### Custom Tailwind Classes

- `.section-container` - Standard page margins/padding
- `.section-title` - Large headings with display font
- `.glass-card` - Glassmorphism effect cards
- `.button-primary` - Primary CTA styling
- `.button-secondary` - Secondary CTA styling
- `.brand-chip` - Small label chips

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Landing page hero
│   ├── Features.tsx    # Features section
│   ├── Navbar.tsx      # Main navigation
│   └── Footer.tsx      # Site footer
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── FeaturesPage.tsx
│   ├── PricingPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── PrivacySecurityPage.tsx
│   └── FAQPage.tsx
├── lib/                # Utilities
│   └── utils.ts        # Helper functions
├── hooks/              # Custom React hooks
└── App.tsx             # Router setup and providers
```

## 🌐 Site Structure

### MVP Pages (Stage 1)
- `/` - Homepage with hero, features, how it works, products
- `/features` - Detailed product features and capabilities
- `/pricing` - Subscription plans and hardware pricing
- `/about` - Mission, values, founding story
- `/contact` - Contact form and support info
- `/privacy` - Privacy policy and security details
- `/faq` - Comprehensive Q&A

### Coming Soon (Stage 2)
- Blog/Journal
- Press & Media Kit
- Partnerships page
- Terms of Service
- Data Deletion Policy

## 🚢 Deployment

### Deploy via Lovable

1. Open [Lovable Project](https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727)
2. Click **Share → Publish**
3. Your site goes live automatically

### Custom Domain Deployment

Lovable doesn't support custom domains yet. For custom domains, deploy via:

- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**

See [Lovable docs on custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/) for details.

## 🔧 Development Guidelines

### Component Patterns

- **Landing sections as components**: Each homepage section is a separate component
- **Page-based routing**: All routes defined in `App.tsx` with catch-all 404
- **Animation-heavy UX**: Custom CSS animations, Intersection Observer, parallax effects
- **Responsive-first**: Mobile-optimized with conditional logic

### Code Style

- Use absolute imports with `@/` prefix
- Follow shadcn/ui patterns for component extensions
- Use `cn()` utility from `@/lib/utils` for className merging
- Maintain brand color consistency across all components

### Product Terminology

Always use proper capitalization and trademark symbols:
- **ETI.AI™** - Reflective Intelligence
- **LuxVault Capsule™** - Offline Data Vault
- **Lumirec™** - Wearable Voice Recorder
- **SoulNFT™** - Verifiable Digital Identity

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)

## 📄 License

© 2024 Eternima. All rights reserved.

---

**Built with privacy and dignity at the core.**
