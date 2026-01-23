# CLAUDE.md — Portfolio

## Project Overview

Interactive 3D developer portfolio built with Spline. A room that responds to visitor's local time, with clickable objects that link to other projects.

**Owner:** Rupayan Roy  
**Timeline:** January – April 2025  
**Live URL:** portfolio.rupayan.dev (planned)

---

## Tech Stack

- **3D:** Spline (@splinetool/react-spline)
- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **Audio:** Howler.js
- **Hosting:** Vercel

---

## Room Objects → Destinations

| Object | Destination | Audio Cue |
|--------|-------------|-----------|
| Monitor | livedoc.rupayan.dev | Click sound |
| Pinboard | Resume section / PDF | Paper rustle |
| Bookshelf | Tech stack display | Book slide |
| Window | GitHub, LinkedIn | Whoosh |
| Calculator | Scientific calculator (Spline) | Key clicks |
| Arcade cabinet | Retro game (Spline) | Retro beeps |
| Vinyl player | Music player (lo-fi) | Needle drop |
| Phone | blrcribs.rupayan.dev | Notification ping |
| Laptop | vox.rupayan.dev | Notification ping |
| Coffee mug | Easter egg | Sip sound |

---

## Time-Based Lighting

Detect visitor's local time via JavaScript `new Date().getHours()`:

| Time | Vibe |
|------|------|
| 6am–12pm | Morning — warm sunlight, coffee steam |
| 12pm–6pm | Afternoon — bright, productive |
| 6pm–9pm | Evening — golden hour |
| 9pm–6am | Night — desk lamp, monitor glow, stars |

---

## Project Structure

```
portfolio/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
├── public/
│   ├── audio/          # Sound effects
│   └── fonts/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── components/
    │   ├── Room/
    │   │   ├── SplineRoom.tsx    # Main Spline embed
    │   │   └── TimeOfDay.tsx     # Lighting controller
    │   ├── Audio/
    │   │   ├── AudioManager.tsx  # Howler.js wrapper
    │   │   └── MusicPlayer.tsx   # Vinyl player UI
    │   ├── UI/
    │   │   ├── MuteButton.tsx
    │   │   └── LoadingScreen.tsx
    │   └── Resume/
    │       └── ResumeModal.tsx
    ├── hooks/
    │   ├── useTimeOfDay.ts
    │   └── useAudio.ts
    ├── lib/
    │   └── spline-events.ts      # Click handlers
    ├── constants/
    │   └── links.ts              # External URLs
    └── styles/
        └── globals.css
```

---

## Coding Conventions

- Functional components only
- TypeScript strict mode
- Tailwind for styling (no CSS modules)
- Hooks for logic extraction
- Constants for external URLs (easy to update)

---

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
```

---

## Key Implementation Notes

### Spline Integration

```tsx
import Spline from '@splinetool/react-spline'

function SplineRoom({ onObjectClick }) {
  function onSplineEvent(e) {
    if (e.target.name === 'monitor') {
      window.open('https://livedoc.rupayan.dev', '_blank')
    }
  }

  return (
    <Spline
      scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
      onMouseDown={onSplineEvent}
    />
  )
}
```

### Time Detection

```tsx
function useTimeOfDay() {
  const hour = new Date().getHours()
  
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 21) return 'evening'
  return 'night'
}
```

### Audio Setup

```tsx
import { Howl } from 'howler'

const sounds = {
  click: new Howl({ src: ['/audio/click.mp3'] }),
  whoosh: new Howl({ src: ['/audio/whoosh.mp3'] }),
}
```

---

## External Links

Update these in `src/constants/links.ts`:

```typescript
export const LINKS = {
  livedoc: 'https://livedoc.rupayan.dev',
  vox: 'https://vox.rupayan.dev',
  blrCribs: 'https://blrcribs.rupayan.dev',
  github: 'https://github.com/YOUR_USERNAME',
  linkedin: 'https://linkedin.com/in/rupayan-roy',
  resume: '/resume.pdf',
}
```

---

## Mobile Handling

- Audio off by default (tap to enable)
- Glow/pulse instead of hover states
- Test on iPhone Safari

---

*Last updated: January 2025*
