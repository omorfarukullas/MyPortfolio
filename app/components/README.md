# FloatingHero Component

## 📦 Two Versions Available

### 1. **FloatingHero.jsx** (3D Version)
Full-featured 3D version using Three.js with React Three Fiber.

**Features:**
- ✨ 3D floating text with depth and bevel
- 🌊 Anti-gravity floating animation
- 🖱️ Mouse parallax effect
- ⭐ 150+ floating particles (purple & cyan)
- 💡 Dynamic lighting system
- 🎨 Gradient glow effects
- 📱 Mobile fallback with 2D text

**Requirements:**
- Three.js font file in `/public/fonts/helvetiker_bold.typeface.json`

### 2. **FloatingHeroSimple.jsx** (2D Version) ⭐ Recommended
Lightweight version using CSS and Framer Motion only.

**Features:**
- 🎭 Beautiful gradient text animations
- 🌊 Smooth floating effect
- 🖱️ Mouse parallax tracking
- ⭐ 50+ CSS-based particles
- 🎨 Animated gradient glows
- 📱 Fully responsive
- ⚡ Better performance

## 🚀 Usage

### Using the Simple Version (Recommended)

```jsx
import FloatingHeroSimple from './app/components/FloatingHeroSimple';

export default function Home() {
  return (
    <main>
      <FloatingHeroSimple />
      {/* Other sections */}
    </main>
  );
}
```

### Using the 3D Version

```jsx
import FloatingHero from './app/components/FloatingHero';

export default function Home() {
  return (
    <main>
      <FloatingHero />
      {/* Other sections */}
    </main>
  );
}
```

## 🎨 Customization

### Change Name

Edit the component file and modify the text:

**FloatingHeroSimple.jsx:**
```jsx
<span className="...">
  YOUR NAME HERE
</span>
```

**FloatingHero.jsx:**
```jsx
<Text3D ...>
  YOUR NAME HERE
  <meshStandardMaterial ... />
</Text3D>
```

### Adjust Colors

Both components use the theme colors from `globals.css`:
- `--cyber-purple`: #8B5CF6
- `--neon-cyan`: #06B6D4
- `--background`: #0F172A

### Particle Count

**FloatingHeroSimple:**
```jsx
function CSSParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, ...) // Change 50 to your desired count
  }, []);
}
```

**FloatingHero:**
```jsx
<Particles count={150} /> // Change count prop
```

## 🎯 Props

Both components are self-contained and don't require props, but you can extend them by adding:

- `className` - Additional CSS classes
- `subtitle` - Custom subtitle text
- `showScroll` - Show/hide scroll indicator

## 📱 Responsive Behavior

- **Desktop:** Full mouse parallax and all animations
- **Mobile/Tablet:** Optimized particle count and simplified effects
- **Small screens:** Adjusted text sizes and spacing

## ⚡ Performance Tips

1. **Use FloatingHeroSimple** for better performance on most devices
2. **Use FloatingHero** only if you specifically need 3D text
3. Reduce particle count on lower-end devices
4. Consider lazy loading for sections below the hero

## 🐛 Troubleshooting

### 3D Text Not Showing
- Ensure font file exists at `/public/fonts/helvetiker_bold.typeface.json`
- Check browser console for errors
- Try the Simple version instead

### Performance Issues
- Reduce particle count
- Use FloatingHeroSimple instead
- Disable mouse parallax on mobile

### Text Not Visible
- Check that theme colors are properly set in `globals.css`
- Ensure component is wrapped in proper Next.js client component
