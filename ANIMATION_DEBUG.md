# Animation Debugging Guide

## Why You Might Not See the Animations

### 1. **Screen Size Check** ⚠️ MOST COMMON ISSUE
All futuristic animations are **disabled on mobile/tablet** for performance.

**Required screen width:** Minimum **768px** (desktop)

**Check your screen size:**
- Open browser console (F12)
- Type: `console.log('Screen width:', window.innerWidth)`
- If < 768px → animations are OFF by design

### 2. **Browser Console Errors**
Open DevTools (F12) and check the Console tab:
- Look for red error messages
- Common issues:
  - Module loading errors
  - TypeScript compilation errors
  - React rendering errors

### 3. **Dev Server Not Running**
The development server must be active:

```bash
cd /Users/salmansaleem/Projects/pulse-robot-template-28084
npm run dev
```

Then open: `http://localhost:8080`

### 4. **Cache Issues**
Hard refresh your browser:
- **Mac:** Cmd + Shift + R
- **Windows/Linux:** Ctrl + Shift + R
- Or: Open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

### 5. **Feature Flags**
Verify flags are enabled in `src/lib/featureFlags.ts`:

```typescript
export const ENABLE_ANIME_GLOBAL = true;   // ← Must be true
export const ENABLE_ANIME_FEATURES = true; // ← Must be true
```

### 6. **Reduced Motion Preference**
If you have "reduce motion" enabled in OS settings, animations will be disabled.

**Check:**
- Open console: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- If `true` → animations are disabled for accessibility
- To disable this check temporarily, comment out lines in `Features.tsx`:
  ```typescript
  // const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // if (prefersReduced || isMobileCheck) return;
  ```

---

## What You SHOULD See (Desktop Only)

### ✅ Background Effects
1. **Cyber grid pattern** - Subtle 50px grid across section
2. **Hexagon pattern** - Honeycomb texture overlay
3. **30 floating particles** - Gold dots moving randomly
4. **Vertical scan line** - Sweeping laser effect (repeats every 4s)
5. **Data streams** - Scrolling code on left/right edges
6. **Cursor trail** - Gold glow following your mouse

### ✅ Card Effects (Hover over feature cards)
1. **3D tilt** - Card follows cursor movement
2. **Holographic border** - Rotating gradient border appears
3. **Magnetic attraction** - Card moves slightly toward cursor
4. **Energy rings** - Triple rings expand from icon on hover
5. **Two orbiting dots** - Top-right and bottom-left corners

### ✅ Section Title
1. **Neon glow** - Pulsing text shadow
2. **Sweeping sheen** - Light bar moving across text

### ✅ CTA Button
1. **Shine effect** - White gradient slides across on hover

---

## Quick Test Commands

### Test 1: Check Screen Size
```javascript
// Paste in browser console
console.log('Desktop mode:', window.innerWidth >= 768);
console.log('Width:', window.innerWidth, 'px');
```

### Test 2: Check Feature Flags
```javascript
// Open Features.tsx in editor and add at top of component:
console.log('Anime flags:', { 
  global: ENABLE_ANIME_GLOBAL, 
  features: ENABLE_ANIME_FEATURES 
});
```

### Test 3: Force Enable (Desktop Debug)
Edit `src/components/Features.tsx` around line 212:

```typescript
// TEMPORARY - Remove after debugging
const prefersReduced = false; // was: window.matchMedia...
const isMobileCheck = false;  // was: window.innerWidth < 768
```

### Test 4: Check Anime.js Import
```javascript
// In browser console
import('animejs').then(anime => {
  console.log('Anime.js loaded:', anime);
}).catch(err => {
  console.error('Anime.js failed:', err);
});
```

---

## Step-by-Step Verification

1. **Stop any running dev server** (Ctrl+C in terminal)
2. **Clear build cache:**
   ```bash
   rm -rf node_modules/.vite
   ```
3. **Start fresh dev server:**
   ```bash
   npm run dev
   ```
4. **Open browser on DESKTOP** (not phone/tablet)
5. **Navigate to:** `http://localhost:8080`
6. **Scroll to "Key Value Propositions" section**
7. **Open DevTools (F12)** → Check Console for errors
8. **Hover over the three feature cards**
9. **Move cursor around the section**

---

## Expected Console Output (No Errors)

When animations load correctly, you should see NO errors and possibly:
```
[Anime.js loaded successfully]
```

## If You See Errors

### Error: "Cannot find module 'animejs'"
**Fix:** Reinstall dependencies
```bash
npm install
```

### Error: "ENABLE_ANIME_GLOBAL is not defined"
**Fix:** Feature flags not importing
- Check file exists: `src/lib/featureFlags.ts`
- Verify import statement in `Features.tsx` line 4

### Error: "Cannot read property 'current' of null"
**Fix:** Refs not initialized before animation
- This is normal on first render
- Check if section has scrolled into view

---

## Still Not Working?

**Take a screenshot of:**
1. Your browser console (F12 → Console tab)
2. The Features section on the page
3. Output of: `console.log(window.innerWidth, navigator.userAgent)`

**Check:**
- Are you using Chrome/Firefox/Safari? (Edge might have issues)
- Is JavaScript enabled?
- Any ad-blockers or script blockers active?

---

## Emergency: Show Me SOMETHING

If you just want to verify the code is running, add this at the top of the Features component:

```typescript
useEffect(() => {
  console.log('🚀 Features component mounted!');
  console.log('📱 Mobile:', isMobile);
  console.log('🎨 Anime flags:', { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_FEATURES });
}, []);
```

Then check your browser console - you should see the rocket emoji message.
