# 🎨 Alejandro's Advanced Animated Portfolio

A production-ready Next.js portfolio with **40+ custom animations**, advanced particle systems, and professional design.

## ✨ Features

### Profile Section Animations
- 🌟 16 burst particles exploding from center
- 🌀 8 spiral particles orbiting continuously
- 🔵 4 gradient-filled moving orbs
- 💫 Original 6 circular particles
- ✨ Animated electric lines & SVG shapes
- 🎨 Chromatic aberration effect
- 💡 Light leak scanning effect
- 📊 Rotating scanlines (retro-tech)
- 🌊 Morphing shapes with displacement filter
- 🎪 Multiple glow layers & shadows

### Technical Features
- ⚡ Next.js 14 (latest)
- 🎬 Framer Motion (advanced animations)
- 🎨 Tailwind CSS 4
- 📱 Fully responsive design
- 🚀 Optimized production build (127 KB first load)
- ♿ Semantic HTML
- 🎯 SEO optimized
- 🔄 Smooth scroll behavior

### Sections
- 🏠 **Hero** - Profile with advanced animations
- 📋 **About** - Background & statistics
- 💼 **Skills** - Technical expertise with hover effects
- 🎯 **Projects** - Featured work showcase
- 💰 **Services** - Offerings & pricing
- 📧 **Contact** - Call to action

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Deploy to Vercel (recommended)
npm install -g vercel
vercel
```

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

## 🎬 Animation Breakdown

### Hero Profile Section
The centerpiece features multiple animation layers:

1. **Background Effects**
   - Rotating gradient (20s rotation)
   - Animated mesh grid pattern
   - Dynamic light orbs with blur
   - Extra purple glow orb

2. **Particle Systems**
   - Burst particles: 16 particles exploding with easing
   - Spiral particles: 8 particles orbiting with rotation
   - Moving orbs: 4 gradient particles with scaling
   - Original orbit: 6 cyan particles circling

3. **Image Effects**
   - Animated pulsing border
   - Scanline effect scrolling
   - Chromatic aberration on hover
   - Light leak sweeping across
   - Brightness/contrast boost
   - Shadow glow on hover

4. **Geometric Overlays**
   - SVG animated lines
   - Expanding/contracting circles
   - Morphing shapes with displacement
   - Electric effects

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to modify the color scheme:
```js
// From cyan/blue to your preference
from-cyan-500 to-blue-500
```

### Adjust Animation Speed
Modify transition durations in `app/page.jsx`:
```js
duration: 4, // seconds
repeat: Infinity,
ease: 'easeInOut'
```

### Add More Particles
Duplicate particle sections and adjust:
```js
{[...Array(20)].map((_, i) => ( // Change 20 to desired count
```

## 📊 Performance

- **Build Size**: 127 KB first load JS
- **Static**: Pre-rendered for speed
- **Images**: Optimized with Next.js
- **Animations**: GPU-accelerated
- **Framework**: Modern Next.js 14

## 🔗 Links

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 📝 License

Feel free to customize and use for your portfolio!

---

**Ready to deploy?** See [DEPLOY.md](./DEPLOY.md) for hosting options.

🚀 **Your portfolio is PRODUCTION READY!**
