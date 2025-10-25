# Copilot Instructions - Eternima Project

## Project Overview
This is a React/TypeScript Vite project for **Eternima** - a digital life preservation platform that helps users capture, reflect on, and preserve their life memories with AI-powered tools. It's a Lovable.dev-hosted project featuring a modern landing page with advanced animations, custom branding, and multi-page navigation.

**Product Focus:** Private, verifiable digital memory preservation with ETI.AI™ reflective intelligence, LuxVault™ offline storage, Lumirec™ wearable recorder, and SoulNFT™ inheritable digital identity.

## Architecture & Key Patterns

### Core Stack
- **Vite + React 18 + TypeScript** - Fast development with hot reload
- **shadcn/ui + Radix UI** - Comprehensive component library with accessibility
- **Tailwind CSS + Custom Design System** - Utility-first styling with brand extensions
- **React Router v6** - Client-side routing with catch-all 404 handling
- **TanStack Query** - Server state management (QueryClient in App.tsx)
- **Lottie React** - Complex animations (see Hero component)

### Directory Structure Conventions
```
src/
├── components/        # Reusable UI components (landing page sections)
│   └── ui/           # shadcn/ui components (button, card, etc.)
├── pages/            # Route components (Index, Dashboard, etc.) 
├── lib/              # Utilities (utils.ts for cn() helper)
└── hooks/            # Custom React hooks
```

### Component Patterns
- **Landing sections as components**: Each homepage section (Hero, Features, etc.) is a separate component imported into `pages/Index.tsx`
- **Page-based routing**: All routes defined in `App.tsx` with explicit catch-all `*` route for 404s
- **Animation-heavy UX**: Custom CSS animations, Intersection Observer for scroll triggers, parallax effects (disabled on mobile)
- **Responsive-first**: Mobile-optimized with conditional logic (`isMobile` checks in Hero.tsx)

### Homepage Content Structure (Official Copy)

The landing page follows this exact content hierarchy and messaging:

**1. Hero Section** (`Hero.tsx`)
- Headline: "Eternima — preserve your life, voice, and memory forever"
- Subhead: "A private, verifiable digital mirror that learns how you think, feel, and act"
- Primary CTA: "Get the App — start your reflection"
- Secondary CTA: "How it works"
- Key message: Private by design, user-controlled data

**2. Key Value Propositions** (`Features.tsx`)
- Three columns: Reflect, Preserve, Pass on
- Each with ETI.AI™, LuxVault™, SoulNFT™ product mentions
- CTA: "Explore features"

**3. How It Works** (`HowItWorks.tsx`)
- 4-step flow: Capture → Reflect → Secure → Share/inherit
- Interactive step cards with auto-cycling imagery
- CTAs: "Start a reflection" + "Request demo for hardware"

**4. Product Spotlight** (`ProductSpotlight.tsx`)
- Four product cards: ETI.AI™, LuxVault Capsule™, Lumirec™, SoulNFT™
- Each with feature bullets
- CTA: "Compare plans & devices"

**5. Why Eternima** (`WhyEternima.tsx`)
- Benefits for: families, caregivers/therapists, creators, heritage orgs
- Focus on privacy, dignity, continuity

**6. Privacy & Security** (`PrivacySecurity.tsx`)
- Local-first architecture explanation
- User-controlled inheritance
- Tamper evidence & biometric safeguards

**7. FAQ Section** (`FAQ.tsx`)
- Common questions: data storage, after death, AI nature, voice cloning, deletion
- Link to full FAQ page

**8. Newsletter/CTA** (`Newsletter.tsx`)
- Email capture for updates

**9. Footer** (`Footer.tsx`)
- Quick links, contact, legal pages

## Development Workflows

### Local Development
```bash
npm run dev          # Start dev server on :8080
npm run build        # Production build
npm run build:dev    # Development mode build
npm run preview      # Preview production build
```

### Component Development
- Use `@/` path alias for imports (configured in vite.config.ts)
- Follow shadcn/ui patterns: extend base components in `components/ui/`
- Custom components go in `components/` root
- Use `cn()` utility from `@/lib/utils` for className merging

### Styling Conventions & Color System

**CRITICAL: Brand Color Usage Rules**
The project uses a strict 4-color branding system. ALL components MUST follow these rules:

1. **Primary Brand (#cb9b32)** - Gold/amber
   - Use for: logos, primary CTAs, key accents, important highlights
   - Tailwind: `brand-primary`, `text-brand-primary`, `bg-brand-primary`
   - Applied in: button primaries, section headings, interactive states

2. **Secondary Brand (#6b5420)** - Dark brown
   - Use for: backgrounds, UI containers, section dividers
   - Tailwind: `brand-secondary`, `bg-brand-secondary`, `text-brand-secondary`
   - Applied in: hero backgrounds, footer, card containers

3. **Tertiary Brand (#d1c8a9)** - Light beige
   - Use for: borders, dividers, subtle backgrounds, muted elements
   - Tailwind: `brand-tertiary`, `border-brand-tertiary`, `bg-brand-tertiary`
   - Applied in: card borders, section separators, hover states

4. **Text Primary (#ffffff)** - White
   - Use for: all primary text on dark backgrounds
   - Use dark text (#1a1a1a or similar) on light backgrounds
   - Maintain WCAG AA contrast ratios

**Custom CSS Classes** (in `src/index.css` under `@layer components`):
- `.section-container` - Standard page margins/padding
- `.section-title` - Large headings with display font
- `.glass-card` - Glassmorphism effect cards  
- `.button-primary` - Primary CTA with brand-primary background
- `.button-secondary` - Secondary CTA with border
- `.brand-chip` - Small label chips with brand styling

**Animation Classes**: Custom keyframes for `fade-in`, `fade-in-right`, `fade-in-left`, `float`, `parallax` effects

**AVOID**: Never use arbitrary "pulse-" colors. These are legacy and should be replaced with proper brand colors.

## Critical Integration Points

### Lovable.dev Integration
- **lovable-tagger** plugin in vite.config.ts for development mode
- Auto-deployment on git push to main branch
- Changes made in Lovable IDE sync to this repository

### Asset Management
- **Lottie animations**: Stored in `/public/` (loop-header.lottie)
- **Custom fonts**: Brockmann font loaded via @font-face in index.css
- **Images**: Use `/lovable-uploads/` prefix for Lovable-managed assets

### State Management
- **No global state library** - using React's built-in state
- **TanStack Query** setup in App.tsx for future API integration
- **Local state patterns**: useState for component state, useEffect for side effects

## Mobile-Specific Considerations
- **Conditional animations**: Many effects disabled on mobile (parallax, 3D transforms)
- **Touch-optimized**: Button sizing and spacing adjusted for mobile
- **Performance**: Animations conditionally loaded based on screen size

## Route Structure
- `/` - Landing page (Index.tsx) with all marketing sections
- `/dashboard` - User dashboard with stats and activity
- `/marketplace` - Product marketplace page
- `/create` - Product creation flow
- `/profile` - User profile management
- Catch-all `*` route for 404 handling

## Key Files to Understand
- `src/App.tsx` - Router setup and global providers
- `src/pages/Index.tsx` - Main landing page composition
- `src/components/Hero.tsx` - Complex animation and interaction patterns
- `tailwind.config.ts` - Custom design system extensions
- `src/index.css` - Global styles and custom component classes
- `components.json` - shadcn/ui configuration

## Product Terminology & Brand Names

Always use the exact product names with proper capitalization and trademark symbols:

- **ETI.AI™** - Reflective Intelligence (the AI system)
- **LuxVault Capsule™** - Offline Data Vault (hardware storage)
- **Lumirec™** - Wearable Voice Recorder (capture device)
- **SoulNFT™** - Verifiable Digital Identity (continuity token)

**Technical Abbreviations** (explain on first use):
- **AI** - Artificial Intelligence
- **LLM** - Large Language Model
- **RAG** - Retrieval-Augmented Generation
- **LoRA** - Low-Rank Adaptation
- **ASR** - Automatic Speech Recognition
- **NFT** - Non-Fungible Token
- **RWA** - Real-World Asset

## Development Tips
- Always use absolute imports with `@/` prefix
- Check mobile responsiveness - many features are conditionally disabled
- Use existing animation patterns from Hero.tsx for consistency
- Follow the established section-based component architecture for new pages
- Leverage custom Tailwind classes (`.section-container`, `.glass-card`, etc.) for consistency

## Critical Color System Issues to Fix

**PROBLEM**: The codebase currently has inconsistent color usage across sections:
- Hero section uses gold (`brand-primary`) heavily
- Middle sections (HowItWorks, ProductSpotlight) use white backgrounds with legacy `pulse-` colors
- Later sections mix tertiary colors

**SOLUTION**: When creating or editing components:
1. Replace ALL `pulse-` color classes with proper brand colors:
   - `pulse-600/pulse-700` → `brand-primary`
   - `pulse-500` → `brand-primary`
   - `pulse-200` → `brand-tertiary`
   - `pulse-50/pulse-100` → `brand-secondary/5` or `brand-tertiary/20`
   - `text-pulse-*` → `text-brand-primary` or `text-brand-secondary`

2. Ensure visual coherence:
   - Dark backgrounds: use `bg-brand-secondary` with `text-white`
   - Light backgrounds: use `bg-white` or `bg-brand-tertiary/10` with dark text
   - Cards: `border-brand-tertiary` with subtle hover effects
   - CTAs: `bg-brand-primary` for primary, `border-brand-primary` for secondary

3. Section backgrounds should alternate:
   - Hero: `bg-brand-secondary` (dark)
   - Features: `bg-brand-tertiary/20` (light)
   - HowItWorks: `bg-white` with brand accent elements
   - Continue alternating for visual rhythm

**Example transformation**:
```tsx
// ❌ WRONG - using legacy pulse colors
<button className="bg-pulse-600 hover:bg-pulse-700">Click</button>

// ✅ RIGHT - using brand system
<button className="bg-brand-primary hover:bg-brand-primary/90">Click</button>
```