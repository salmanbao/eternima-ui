# 🎬 Eternima Homepage Animation Plan

## Overview
This document outlines a comprehensive animation strategy for the Eternima homepage to create an engaging, modern, and premium user experience while maintaining performance and accessibility.

---

## 🎯 Animation Principles

### Core Goals
1. **Progressive Disclosure** - Reveal content as users scroll
2. **Attention Direction** - Guide users through the narrative flow
3. **Premium Feel** - Subtle, sophisticated animations that convey quality
4. **Performance First** - Use GPU-accelerated properties (transform, opacity)
5. **Mobile-Responsive** - Reduce or disable complex animations on mobile devices

### Performance Guidelines
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
- Use `will-change` sparingly and only when needed
- Implement Intersection Observer for scroll-triggered animations
- Add `prefers-reduced-motion` media query support

---

## 📱 Section-by-Section Animation Strategy

### 1. **Hero Section** (Currently has animations ✅)
**Current State:** Already has parallax, 3D tilt, and Lottie animation

**Enhancements:**
- ✅ Keep existing 3D tilt on hero image (desktop only)
- ✅ Keep Lottie animation loop
- ✅ Keep parallax scroll effect
- 🆕 Add typewriter effect to main headline
- 🆕 Add staggered fade-in for CTA buttons (0.2s delay between them)
- 🆕 Add subtle pulse animation to primary CTA button
- 🆕 Add floating badge animation ("Private by Design" chip)

**Animation Timeline:**
```
0.0s: Hero background gradient fade-in
0.2s: Headline typewriter starts
0.8s: Subheadline fade-in from bottom
1.0s: Primary CTA fade-in + scale (with pulse)
1.2s: Secondary CTA fade-in
1.4s: Lottie animation visible
1.6s: Privacy badge float-in from right
```

**Code Pattern:**
```tsx
// Typewriter effect
<h1 className="animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-brand-primary">
  Eternima — preserve your life forever
</h1>

// Staggered CTAs
<div className="flex gap-4">
  <button className="animate-fade-in animation-delay-1000">Get Started</button>
  <button className="animate-fade-in animation-delay-1200">Learn More</button>
</div>
```

---

### 2. **Features Section** (Has basic fade-in ✅)
**Current State:** Intersection Observer with fade-in on cards

**Enhancements:**
- 🆕 Add staggered slide-in from bottom (cards appear one by one)
- 🆕 Add icon rotation on card hover
- 🆕 Add scale + shadow lift on card hover
- 🆕 Add gradient border animation on hover
- 🆕 Add number counter animation for stats (if any)

**Animation Timeline:**
```
On scroll into view:
0.0s: Section title slide-in from left
0.2s: Section description fade-in
0.4s: First feature card slides up + fades in
0.6s: Second feature card slides up + fades in
0.8s: Third feature card slides up + fades in
```

**Code Pattern:**
```tsx
// Staggered cards
<div className="grid grid-cols-3 gap-6">
  {features.map((feature, i) => (
    <div 
      key={i}
      className="opacity-0 animate-slide-up"
      style={{ animationDelay: `${i * 0.2}s` }}
    >
      {/* Card content with hover effects */}
      <div className="hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <div className="icon-container group-hover:rotate-12 transition-transform">
          {feature.icon}
        </div>
      </div>
    </div>
  ))}
</div>
```

---

### 3. **How It Works Section**
**Current State:** Basic structure, likely minimal animations

**Enhancements:**
- 🆕 Add animated timeline/progress line that draws as user scrolls
- 🆕 Add step number counter animation (1 → 2 → 3 → 4)
- 🆕 Add slide-in alternating (left/right) for each step
- 🆕 Add image carousel auto-cycle with fade transition
- 🆕 Add connecting line animation between steps
- 🆕 Add active step highlight with pulse effect

**Animation Timeline:**
```
On scroll into view:
0.0s: Timeline line draws from top to bottom (SVG stroke animation)
0.3s: Step 1 slides in from left, number counts up
0.6s: Step 2 slides in from right, number counts up
0.9s: Step 3 slides in from left, number counts up
1.2s: Step 4 slides in from right, number counts up
Continuous: Auto-cycle images every 3s with crossfade
```

**Code Pattern:**
```tsx
// SVG timeline line
<svg className="absolute left-1/2 top-0 h-full">
  <line 
    className="stroke-brand-primary animate-draw-line"
    strokeDasharray="1000"
    strokeDashoffset="1000"
  />
</svg>

// Alternating slides
{steps.map((step, i) => (
  <div className={cn(
    "opacity-0",
    i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
  )}
  style={{ animationDelay: `${i * 0.3}s` }}>
    <NumberCounter target={i + 1} />
  </div>
))}
```

---

### 4. **Product Spotlight Section**
**Current State:** Static product cards

**Enhancements:**
- 🆕 Add card flip animation on hover (3D rotation)
- 🆕 Add particle effects around product images
- 🆕 Add glow effect on hover
- 🆕 Add feature list items fade-in sequentially
- 🆕 Add "Learn More" button slide-in from bottom on hover
- 🆕 Add badge float animation for "Most Popular" or "New" tags

**Animation Timeline:**
```
On scroll into view:
0.0s: Section title + description fade-in
0.3s: Product cards grid appears with stagger
Each card: 0.1s delay between cards

On card hover:
0.0s: Card lifts with shadow
0.1s: Product image scales + glows
0.2s: Feature bullets highlight one by one
0.3s: CTA button slides up from bottom
```

**Code Pattern:**
```tsx
// 3D card flip
<div className="group perspective-1000">
  <div className="relative preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
    {/* Front face */}
    <div className="backface-hidden">
      <img className="group-hover:scale-110 transition-transform duration-500" />
    </div>
    {/* Back face */}
    <div className="backface-hidden rotate-y-180 absolute inset-0">
      {/* Detailed product info */}
    </div>
  </div>
</div>
```

---

### 5. **Why Eternima Section**
**Current State:** Text-heavy benefits section

**Enhancements:**
- 🆕 Add icon pop-in animation (scale from 0 to 1 with bounce)
- 🆕 Add text reveal line-by-line (mask animation)
- 🆕 Add background gradient shift on scroll
- 🆕 Add hover state with icon animation
- 🆕 Add connecting dots/lines between benefit cards

**Animation Timeline:**
```
On scroll into view:
0.0s: Background gradient starts shifting
0.2s: Section heading fade-in with underline draw
0.4s: First benefit icon pops in with bounce
0.5s: First benefit text reveals line-by-line
0.7s: Second benefit icon pops in
0.8s: Second benefit text reveals
... (continue pattern)
```

**Code Pattern:**
```tsx
// Icon pop with bounce
<div className="animate-scale-in-bounce">
  <Icon className="text-brand-primary" />
</div>

// Text line reveal
<p className="overflow-hidden">
  {lines.map((line, i) => (
    <span 
      key={i}
      className="block animate-slide-in-right"
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      {line}
    </span>
  ))}
</p>
```

---

### 6. **Privacy & Security Section**
**Current State:** Important trust-building content

**Enhancements:**
- 🆕 Add shield icon pulse animation
- 🆕 Add lock/unlock animation on scroll
- 🆕 Add security badge slide-in from sides
- 🆕 Add encrypted data flow animation (dots moving along lines)
- 🆕 Add checkmark animations for feature list
- 🆕 Add gradient border pulse on cards

**Animation Timeline:**
```
On scroll into view:
0.0s: Shield icon glows and pulses
0.3s: "Zero-Knowledge" badge slides in from left
0.6s: "Local-First" badge slides in from right
0.9s: Security features list appears with checkmarks
1.2s: Encrypted data flow animation starts (continuous loop)
```

**Code Pattern:**
```tsx
// Pulsing shield
<Shield className="animate-pulse-glow text-brand-primary w-16 h-16" />

// Data flow animation
<svg className="absolute inset-0">
  <path className="stroke-brand-primary" />
  <circle 
    className="fill-brand-primary animate-move-along-path"
    r="4"
  />
</svg>
```

---

### 7. **Testimonials Section**
**Current State:** Social proof carousel

**Enhancements:**
- 🆕 Add auto-scroll carousel with fade transition
- 🆕 Add avatar zoom on active testimonial
- 🆕 Add quote marks fade-in animation
- 🆕 Add star rating fill animation
- 🆕 Add subtle background blur shift between testimonials
- 🆕 Add drag-to-scroll interaction with momentum

**Animation Timeline:**
```
Auto-cycle every 5 seconds:
0.0s: Current testimonial fades out (opacity 1 → 0)
0.3s: New testimonial fades in (opacity 0 → 1)
0.5s: Avatar scales up slightly
0.7s: Stars fill one by one (left to right)
1.0s: Quote text types in (optional, subtle effect)
```

**Code Pattern:**
```tsx
// Carousel with transitions
<div className="relative overflow-hidden">
  {testimonials.map((t, i) => (
    <div 
      className={cn(
        "absolute inset-0 transition-all duration-700",
        i === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      {/* Testimonial content */}
    </div>
  ))}
</div>

// Star rating animation
<div className="flex gap-1">
  {[1,2,3,4,5].map((star, i) => (
    <Star 
      className="animate-fill-star"
      style={{ animationDelay: `${i * 0.1}s` }}
    />
  ))}
</div>
```

---

### 8. **FAQ Section**
**Current State:** Accordion with expand/collapse

**Enhancements:**
- 🆕 Add smooth accordion height animation (already in Radix)
- 🆕 Add rotate animation on chevron icon
- 🆕 Add highlight pulse when question is expanded
- 🆕 Add search bar with results fade-in
- 🆕 Add category filter pills with slide transition

**Animation Timeline:**
```
On question click:
0.0s: Chevron rotates 180deg
0.1s: Answer content slides down with fade
0.2s: Answer text fades in line-by-line

On search:
0.0s: Results update (instant)
0.1s: Matching questions highlight with pulse
0.2s: Non-matching questions fade to 50% opacity
```

**Code Pattern:**
```tsx
// Accordion with animations (using Radix)
<AccordionItem>
  <AccordionTrigger className="group">
    <span>Question</span>
    <ChevronDown className="group-data-[state=open]:rotate-180 transition-transform" />
  </AccordionTrigger>
  <AccordionContent className="animate-accordion-down">
    {answer}
  </AccordionContent>
</AccordionItem>
```

---

### 9. **Newsletter Section**
**Current State:** Email signup form

**Enhancements:**
- 🆕 Add input focus glow animation
- 🆕 Add success checkmark animation on submit
- 🆕 Add confetti burst on successful signup
- 🆕 Add email icon float animation
- 🆕 Add button loading spinner with smooth transition

**Animation Timeline:**
```
On form interaction:
Input focus: Border glows with brand color
Button hover: Lift + shadow increase

On submit:
0.0s: Button shows loading spinner
1.0s: Success state - checkmark scales in with bounce
1.2s: Confetti particles explode outward
2.0s: Success message fades in
```

**Code Pattern:**
```tsx
// Input with glow
<input className="focus:ring-4 focus:ring-brand-primary/20 transition-all" />

// Success animation
{submitted && (
  <div className="animate-scale-in-bounce">
    <CheckCircle className="text-green-500" />
    <Confetti numberOfPieces={50} recycle={false} />
  </div>
)}
```

---

### 10. **Footer**
**Current State:** Static footer with links

**Enhancements:**
- 🆕 Add link hover underline slide animation
- 🆕 Add social icon bounce on hover
- 🆕 Add "back to top" button with smooth scroll + fade-in when scrolled
- 🆕 Add newsletter icon pulse

**Animation Timeline:**
```
On hover:
Link: Underline slides in from left to right
Social icon: Bounces up slightly with shadow

On scroll:
"Back to top" button fades in at 50% page scroll
```

---

## 🎨 New Animation Classes to Add

### In `tailwind.config.ts`:
```typescript
keyframes: {
  'typewriter': {
    'from': { width: '0' },
    'to': { width: '100%' }
  },
  'slide-up': {
    'from': { opacity: '0', transform: 'translateY(30px)' },
    'to': { opacity: '1', transform: 'translateY(0)' }
  },
  'slide-in-left': {
    'from': { opacity: '0', transform: 'translateX(-50px)' },
    'to': { opacity: '1', transform: 'translateX(0)' }
  },
  'slide-in-right': {
    'from': { opacity: '0', transform: 'translateX(50px)' },
    'to': { opacity: '1', transform: 'translateX(0)' }
  },
  'scale-in-bounce': {
    '0%': { transform: 'scale(0)', opacity: '0' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  },
  'draw-line': {
    'to': { strokeDashoffset: '0' }
  },
  'pulse-glow': {
    '0%, 100%': { 
      boxShadow: '0 0 20px rgba(203, 155, 50, 0.3)',
      transform: 'scale(1)'
    },
    '50%': { 
      boxShadow: '0 0 40px rgba(203, 155, 50, 0.6)',
      transform: 'scale(1.05)'
    }
  },
  'fill-star': {
    'from': { fill: 'transparent' },
    'to': { fill: 'currentColor' }
  },
  'rotate-y-180': {
    'from': { transform: 'rotateY(0deg)' },
    'to': { transform: 'rotateY(180deg)' }
  }
},
animation: {
  'typewriter': 'typewriter 3s steps(40) forwards',
  'slide-up': 'slide-up 0.6s ease-out forwards',
  'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
  'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
  'scale-in-bounce': 'scale-in-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
  'draw-line': 'draw-line 1.5s ease-out forwards',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  'fill-star': 'fill-star 0.3s ease-out forwards',
  'rotate-y-180': 'rotate-y-180 0.7s ease-out'
}
```

### In `index.css`:
```css
/* Animation delay utilities */
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-1200 { animation-delay: 1.2s; }

/* 3D perspective utilities */
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔧 Implementation Priority

### Phase 1: Essential Animations (Week 1)
1. ✅ Hero typewriter effect + staggered CTAs
2. ✅ Features section staggered cards
3. ✅ How It Works timeline drawing
4. ✅ Scroll-triggered fade-ins (Intersection Observer)

### Phase 2: Enhanced Interactions (Week 2)
5. ✅ Product cards 3D flip/hover effects
6. ✅ Testimonial carousel auto-cycle
7. ✅ FAQ accordion improvements
8. ✅ Privacy section security animations

### Phase 3: Polish & Details (Week 3)
9. ✅ Newsletter success animations
10. ✅ Footer interactions
11. ✅ Loading states for all CTAs
12. ✅ Back to top button
13. ✅ Reduced motion accessibility

---

## 📊 Performance Budget

### Animation Performance Metrics:
- **First Contentful Paint (FCP):** < 1.5s
- **Time to Interactive (TTI):** < 3.5s
- **Total Animation CPU Time:** < 200ms per section
- **Frame Rate:** Maintain 60fps during animations
- **Bundle Size Impact:** < 10KB additional JavaScript

### Optimization Strategies:
1. Use CSS animations instead of JS when possible
2. Debounce scroll event listeners
3. Use `requestAnimationFrame` for JS animations
4. Lazy load animation libraries (e.g., react-spring, framer-motion)
5. Implement virtual scrolling for long lists

---

## 🎭 Animation Libraries to Consider

### Recommended:
- **Framer Motion** - React animation library (30KB gzipped)
  - Best for: Complex orchestrated animations
  - Use case: Product spotlight 3D flips, complex transitions

- **React Spring** - Spring-physics based (20KB gzipped)
  - Best for: Natural, physics-based animations
  - Use case: Smooth carousel transitions, elastic effects

- **GSAP** - Professional animation library (40KB core)
  - Best for: Timeline-based animations, scroll triggers
  - Use case: How It Works timeline, parallax effects

### Current Usage:
- ✅ **Lottie** - Already used for Hero animation
- ✅ **Tailwind Animate** - CSS animations plugin
- ✅ **Intersection Observer API** - Native browser API

---

## 🧪 Testing Checklist

### Browser Testing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Performance Testing:
- [ ] Lighthouse score > 90
- [ ] No layout shift (CLS < 0.1)
- [ ] Smooth 60fps animations
- [ ] Works with slow 3G network
- [ ] Battery usage test on mobile

### Accessibility Testing:
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] No flashing animations > 3Hz
- [ ] Color contrast maintained during animations

---

## 📝 Implementation Notes

### Code Organization:
```
src/
├── animations/
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useParallax.ts
│   ├── variants/
│   │   ├── fadeVariants.ts
│   │   ├── slideVariants.ts
│   │   └── scaleVariants.ts
│   └── utils/
│       ├── animationConfig.ts
│       └── prefersReducedMotion.ts
```

### Best Practices:
1. Create reusable animation hooks
2. Use CSS variables for timing values
3. Centralize animation configuration
4. Document all animation timings
5. Add comments explaining complex animations
6. Use semantic animation names

---

## 🎯 Success Metrics

### User Engagement:
- **Scroll Depth:** Target 70%+ users reach bottom
- **Time on Page:** Increase by 25%
- **Bounce Rate:** Decrease by 15%
- **CTA Click Rate:** Increase by 30%

### Technical Metrics:
- **Animation Smoothness:** 0 dropped frames on desktop, < 5% on mobile
- **Load Time Impact:** < 500ms increase
- **Battery Usage:** < 10% increase on mobile

---

## 🚀 Next Steps

1. **Review and Approve** this plan with stakeholders
2. **Implement Phase 1** animations (essential)
3. **A/B Test** animation vs. no animation on key metrics
4. **Gather User Feedback** on animation preferences
5. **Iterate and Refine** based on data

---

**Last Updated:** October 25, 2025
**Author:** Development Team
**Status:** 📋 Planning Complete → Ready for Implementation
