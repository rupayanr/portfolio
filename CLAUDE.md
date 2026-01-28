# CLAUDE.md — Portfolio (Terminal + Bento Grid)

## Project Overview

A developer portfolio combining terminal aesthetics with a modern bento grid layout. Features interactive commands, 5 switchable themes, and a mobile-friendly terminal drawer.

**Owner:** Rupayan Roy  
**Timeline:** ~20 hours  
**Live URL:** rupayan.dev (planned)

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Font | JetBrains Mono |
| Hosting | Vercel |

**No backend. No Docker. Pure static site.**

---

## Design Philosophy

- Terminal-inspired UI with modern bento grid layout
- Mobile-first, works everywhere
- Interactive terminal (fixed on desktop, drawer on mobile)
- 5 theme options (persisted to localStorage)
- Accessible (reduced motion, keyboard nav, semantic HTML)
- Fast load (< 1s)

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
│   ├── favicon.svg
│   ├── og-image.png
│   └── resume.pdf
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── assets/
    │   └── ascii.ts                 # ASCII art strings
    ├── themes/
    │   └── index.ts                 # Theme definitions
    ├── context/
    │   └── ThemeContext.tsx         # Theme provider
    ├── hooks/
    │   ├── useTypingEffect.ts       # Typing animation
    │   ├── useLocalStorage.ts       # Persist data
    │   ├── useCommands.ts           # Command parser
    │   └── useTerminal.ts           # Terminal state
    ├── components/
    │   ├── BootSequence/
    │   │   └── BootSequence.tsx     # Initial load animation
    │   ├── Terminal/
    │   │   ├── TerminalWindow.tsx   # Main wrapper
    │   │   ├── TerminalHeader.tsx   # Window buttons + theme picker
    │   │   ├── TerminalInput.tsx    # Command input
    │   │   ├── TerminalOutput.tsx   # Command responses
    │   │   ├── TerminalDrawer.tsx   # Mobile drawer
    │   │   ├── TerminalToggle.tsx   # Mobile floating button
    │   │   ├── CommandChips.tsx     # Clickable command buttons
    │   │   └── Cursor.tsx           # Blinking cursor
    │   ├── Bento/
    │   │   ├── BentoGrid.tsx        # Grid layout
    │   │   ├── BentoCard.tsx        # Individual card
    │   │   ├── HeroCard.tsx         # ASCII name + bio
    │   │   ├── SkillsCard.tsx       # Tech stack
    │   │   ├── ProjectCard.tsx      # Project item
    │   │   ├── LinksCard.tsx        # Social links
    │   │   └── ContactCard.tsx      # Email + resume
    │   ├── UI/
    │   │   ├── ThemePicker.tsx      # Theme dropdown
    │   │   ├── Toast.tsx            # Notifications
    │   │   └── ToastContainer.tsx   # Toast manager
    │   └── NotFound.tsx             # 404 page
    ├── data/
    │   ├── projects.ts              # Project data
    │   ├── skills.ts                # Skills list
    │   └── commands.ts              # Command definitions
    └── types/
        └── index.ts                 # TypeScript types
```

---

## Features Overview

### 1. Boot Sequence (First Visit)

Shows once, stored in localStorage, skippable.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                                                                │
│   RUPAYAN OS v1.0.0                                            │
│   ─────────────────                                            │
│                                                                │
│   [■■■■■■■■░░] Initializing...                                 │
│                                                                │
│   ✓ Loading themes                                             │
│   ✓ Indexing projects                                          │
│   ✓ Brewing coffee                                             │
│   ✓ Ready                                                      │
│                                                                │
│   Click anywhere or press any key to continue_                 │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Duration: 2-3 seconds
- Skip: Click anywhere or press any key
- Shows once: localStorage flag `hasBooted`
- Lines appear with typing effect (staggered)

---

### 2. Themes (5 Total)

```typescript
// src/themes/index.ts

export interface Theme {
  name: string
  id: string
  colors: {
    bg: string
    bgSecondary: string
    text: string
    textDim: string
    accent: string
    border: string
  }
}

export const themes: Theme[] = [
  {
    name: 'Dracula',
    id: 'dracula',
    colors: {
      bg: '#282a36',
      bgSecondary: '#44475a',
      text: '#f8f8f2',
      textDim: '#6272a4',
      accent: '#bd93f9',
      border: '#44475a',
    }
  },
  {
    name: 'Nord',
    id: 'nord',
    colors: {
      bg: '#2e3440',
      bgSecondary: '#3b4252',
      text: '#eceff4',
      textDim: '#4c566a',
      accent: '#88c0d0',
      border: '#4c566a',
    }
  },
  {
    name: 'Tokyo Night',
    id: 'tokyo-night',
    colors: {
      bg: '#1a1b26',
      bgSecondary: '#24283b',
      text: '#c0caf5',
      textDim: '#565f89',
      accent: '#7aa2f7',
      border: '#414868',
    }
  },
  {
    name: 'Gruvbox',
    id: 'gruvbox',
    colors: {
      bg: '#282828',
      bgSecondary: '#3c3836',
      text: '#ebdbb2',
      textDim: '#928374',
      accent: '#fabd2f',
      border: '#504945',
    }
  },
  {
    name: 'Matrix',
    id: 'matrix',
    colors: {
      bg: '#0d0d0d',
      bgSecondary: '#1a1a1a',
      text: '#00ff00',
      textDim: '#008800',
      accent: '#00ff00',
      border: '#003300',
    }
  },
]

export const defaultTheme = 'dracula'
```

**Features:**
- Persists to localStorage
- Smooth 200ms transition
- Accessible via dropdown OR `theme` command OR `t` key
- Selection color matches theme accent

---

### 3. Layout — Desktop

```
┌──────────────────────────────────────────────────────────────────┐
│  ● ● ●   rupayan@portfolio:~                     [Dracula ▼]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────┐ ┌──────────────────────────┐  │
│  │  $ whoami                     │ │  $ cat skills.txt        │  │
│  │                               │ │                          │  │
│  │  ██████╗ ██╗   ██╗██████╗     │ │  Python · FastAPI        │  │
│  │  ██╔══██╗██║   ██║██╔══██╗    │ │  React · TypeScript      │  │
│  │  ██████╔╝██║   ██║██████╔╝    │ │  PostgreSQL · Redis      │  │
│  │  ██╔══██╗██║   ██║██╔═══╝     │ │  WebSockets · Docker     │  │
│  │  ██║  ██║╚██████╔╝██║         │ │  RAG · Git               │  │
│  │  ╚═╝  ╚═╝ ╚═════╝ ╚═╝         │ │                          │  │
│  │  ... (full ASCII name)        │ │                          │  │
│  │                               │ └──────────────────────────┘  │
│  │  Rupayan Roy   🟢 Available   │                               │
│  │  Senior Software Engineer     │                               │
│  │  6 years building stuff       │                               │
│  │                               │                               │
│  │  [⌂ GitHub] [⌘ LinkedIn] [✉]  │                               │
│  └───────────────────────────────┘                               │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  $ ls projects/                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐   │
│  │  livedoc/   │ │ resume-     │ │  cribinfo/  │ │  gitwho/  │   │
│  │             │ │ roaster/    │ │             │ │           │   │
│  │  Real-time  │ │             │ │  Housing    │ │  Git      │   │
│  │  collab     │ │  AI roasts  │ │  search     │ │  stats    │   │
│  │  editor     │ │  your CV    │ │  with RAG   │ │  CLI      │   │
│  │             │ │             │ │             │ │           │   │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │ │  [npm →]  │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘   │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  $ contact                                                │   │
│  │                                                           │   │
│  │  hello@rupayan.dev         [✉ Copy Email] [↓ Download CV] │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  $ _                                                             │
│                                                                  │
│  [? help] [◧ projects] [❖ skills] [◐ theme] [⌂ github] [↓ resume]│
└──────────────────────────────────────────────────────────────────┘
```

---

### 4. Layout — Mobile

```
┌────────────────────────┐
│ ● ● ●       [Nord ▼]   │
├────────────────────────┤
│                        │
│ ┌────────────────────┐ │
│ │ $ whoami           │ │
│ │                    │ │
│ │  ██████╗ ██████╗   │ │
│ │  ██╔══██╗██╔══██╗  │ │
│ │  ██████╔╝██████╔╝  │ │
│ │  ██╔══██╗██╔══██╗  │ │
│ │  ██║  ██║██║  ██║  │ │
│ │  ╚═╝  ╚═╝╚═╝  ╚═╝  │ │
│ │                    │ │
│ │  Rupayan Roy       │ │
│ │  Software Engineer │ │
│ │  🟢 Available      │ │
│ │                    │ │
│ │  [⌂] [⌘] [✉]       │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ $ cat skills.txt   │ │
│ │                    │ │
│ │ Python · FastAPI   │ │
│ │ React · TypeScript │ │
│ │ PostgreSQL · RAG   │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ $ ls projects/     │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ livedoc/           │ │
│ │                    │ │
│ │ Real-time collab   │ │
│ │ editor             │ │
│ │                    │ │
│ │ [View →]           │ │
│ └────────────────────┘ │
│                        │
│ ... more cards ...     │
│                        │
│                   ┌───┐│
│                   │>_ ││ ← Terminal toggle
│                   └───┘│
└────────────────────────┘
```

---

### 5. Mobile Terminal Drawer

Tap the floating `>_` button to open:

```
┌────────────────────────┐
│ ● ● ●       [Nord ▼]   │
├────────────────────────┤
│                        │
│  (content dimmed)      │
│                        │
├────────────────────────┤
│                   [✕]  │
│  $ _                   │
│                        │
│  Output:               │
│  ✓ Theme: Matrix       │
│                        │
│  ┌────┐┌────┐┌────┐    │
│  │help││proj││skill│   │
│  └────┘└────┘└────┘    │
│  ┌────┐┌────┐┌────┐    │
│  │theme││git││resume│  │
│  └────┘└────┘└────┘    │
│                        │
└────────────────────────┘
```

**Behavior:**
- Opens from bottom (slide up)
- Close: tap ✕ or press Escape
- Max height: 60vh
- Backdrop dims content behind

---

### 6. ASCII Art

**Desktop — Full Name (stacked):**

```
 ██████╗ ██╗   ██╗██████╗  █████╗ ██╗   ██╗ █████╗ ███╗   ██╗
 ██╔══██╗██║   ██║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║
 ██████╔╝██║   ██║██████╔╝███████║ ╚████╔╝ ███████║██╔██╗ ██║
 ██╔══██╗██║   ██║██╔═══╝ ██╔══██║  ╚██╔╝  ██╔══██║██║╚██╗██║
 ██║  ██║╚██████╔╝██║     ██║  ██║   ██║   ██║  ██║██║ ╚████║
 ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝

 ██████╗  ██████╗ ██╗   ██╗
 ██╔══██╗██╔═══██╗╚██╗ ██╔╝
 ██████╔╝██║   ██║ ╚████╔╝ 
 ██╔══██╗██║   ██║  ╚██╔╝  
 ██║  ██║╚██████╔╝   ██║   
 ╚═╝  ╚═╝ ╚═════╝    ╚═╝   
```

**Mobile — Initials Only:**

```
 ██████╗ ██████╗ 
 ██╔══██╗██╔══██╗
 ██████╔╝██████╔╝
 ██╔══██╗██╔══██╗
 ██║  ██║██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝
```

**Implementation:**

```tsx
{/* Desktop */}
<pre className="hidden md:block text-[var(--accent)] text-xs leading-tight">
  {ASCII_FULL_NAME}
</pre>

{/* Mobile */}
<pre className="md:hidden text-[var(--accent)] text-xs leading-tight">
  {ASCII_INITIALS}
</pre>
<h1 className="md:hidden text-xl font-bold mt-2">Rupayan Roy</h1>
```

---

### 7. Commands

| Command | Action | Response |
|---------|--------|----------|
| `help` | Show all commands | List of commands |
| `whoami` | Scroll to hero | (scrolls) |
| `projects` | Scroll to projects | (scrolls) |
| `skills` | Show tech stack | List of skills |
| `theme` | List themes | Available themes |
| `theme <id>` | Switch theme | "✓ Theme: {name}" |
| `github` | Open GitHub | (opens new tab) |
| `linkedin` | Open LinkedIn | (opens new tab) |
| `email` | Copy email | "✓ Copied hello@rupayan.dev" |
| `resume` | Download resume | "⬇ Downloading..." |
| `source` | Open portfolio repo | (opens new tab) |
| `clear` | Clear output | (clears) |

**Easter Eggs:**

| Command | Response |
|---------|----------|
| `sudo rm -rf /` | "Nice try 😏" |
| `matrix` | Switches to Matrix theme |
| `hire` | "Great choice! 🎉 Email me at hello@rupayan.dev" |

---

### 8. Command Chips (with Icons)

```typescript
// src/data/commands.ts
import { 
  HelpCircle, FolderGit2, Code, Palette, 
  Github, Linkedin, Mail, FileDown 
} from 'lucide-react'

export const commandChips = [
  { cmd: 'help', icon: HelpCircle, label: 'help' },
  { cmd: 'projects', icon: FolderGit2, label: 'projects' },
  { cmd: 'skills', icon: Code, label: 'skills' },
  { cmd: 'theme', icon: Palette, label: 'theme' },
  { cmd: 'github', icon: Github, label: 'github' },
  { cmd: 'linkedin', icon: Linkedin, label: 'linkedin' },
  { cmd: 'email', icon: Mail, label: 'email' },
  { cmd: 'resume', icon: FileDown, label: 'resume' },
]
```

**Styling:**

```tsx
<button 
  onClick={() => runCommand(cmd)}
  className="flex items-center gap-1.5 px-3 py-1.5 
             bg-[var(--bg)] border border-[var(--border)] 
             rounded-md text-sm 
             hover:border-[var(--accent)] transition-colors"
>
  <Icon size={14} />
  {label}
</button>
```

---

### 9. Terminal Features

| Feature | Description |
|---------|-------------|
| **Input** | Text field with blinking cursor |
| **Command chips** | Clickable buttons (icons + labels) |
| **History** | ↑/↓ arrows cycle previous commands |
| **Output** | Shows last 5 command responses |
| **Clear** | `clear` command wipes output |
| **Mobile input** | `inputMode="text"`, `autoCapitalize="none"`, `autoCorrect="off"` |

---

### 10. Toast Notifications

```tsx
// Types
type ToastType = 'success' | 'info' | 'error'

// Examples
{ type: 'success', icon: Check, message: 'Email copied!' }
{ type: 'info', icon: Download, message: 'Downloading resume...' }
{ type: 'error', icon: AlertCircle, message: 'Unknown command' }
```

**Behavior:**
- Position: bottom-right (desktop), bottom-center (mobile)
- Auto-dismiss: 3 seconds
- Animate: slide in, fade out

---

### 11. Project Data

```typescript
// src/data/projects.ts

export interface Project {
  name: string
  description: string
  tech: string[]
  url?: string
  github?: string
  npm?: string
  status: 'live' | 'coming-soon'
}

export const projects: Project[] = [
  {
    name: 'livedoc',
    description: 'Real-time collaborative markdown editor',
    tech: ['React', 'FastAPI', 'WebSockets', 'Y.js'],
    url: 'https://livedoc.rupayan.dev',
    github: 'https://github.com/rupayan/livedoc',
    status: 'coming-soon',
  },
  {
    name: 'resume-roaster',
    description: 'Upload your resume, get brutally honest AI feedback',
    tech: ['React', 'FastAPI', 'Ollama', 'PDF'],
    url: 'https://resumeroaster.rupayan.dev',
    github: 'https://github.com/rupayan/resume-roaster',
    status: 'coming-soon',
  },
  {
    name: 'cribinfo',
    description: 'Housing search powered by RAG',
    tech: ['React', 'FastAPI', 'pgvector', 'Leaflet'],
    url: 'https://cribinfo.rupayan.dev',
    github: 'https://github.com/rupayan/cribinfo',
    status: 'coming-soon',
  },
  {
    name: 'gitwho',
    description: 'CLI tool for git contributor stats',
    tech: ['TypeScript', 'Node.js', 'Commander'],
    npm: 'https://npmjs.com/package/gitwho',
    github: 'https://github.com/rupayan/gitwho',
    status: 'coming-soon',
  },
]
```

**Card States:**

```tsx
{project.status === 'live' ? (
  <a href={project.url} className="...">
    <ArrowRight size={14} /> View
  </a>
) : (
  <span className="text-[var(--text-dim)] text-sm">
    Coming Soon
  </span>
)}
```

---

### 12. Skills Data

```typescript
// src/data/skills.ts

export const skills = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'PostgreSQL',
  'Redis',
  'WebSockets',
  'Docker',
  'RAG',
  'Git',
]
```

---

### 13. Links Data

```typescript
// src/data/links.ts
import { Github, Linkedin, Mail, FileDown } from 'lucide-react'

export const links = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/rupayan', 
    icon: Github,
    action: 'link'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/in/rupayan-roy', 
    icon: Linkedin,
    action: 'link'
  },
  { 
    name: 'Email', 
    url: 'hello@rupayan.dev', 
    icon: Mail,
    action: 'copy'
  },
  { 
    name: 'Resume', 
    url: '/resume.pdf', 
    icon: FileDown,
    action: 'download'
  },
]
```

---

### 14. Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus terminal input |
| `t` | Cycle to next theme |
| `Escape` | Close terminal drawer (mobile) / Unfocus input |
| `↑` | Previous command in history |
| `↓` | Next command in history |
| `Enter` | Execute command |

---

### 15. 404 Page

```
┌──────────────────────────────────────────────────────────────┐
│  ● ● ●   rupayan@portfolio:~                    [Dracula ▼]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  $ cd /unknown-page                                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │   bash: cd: /unknown-page: No such file or directory   │  │
│  │                                                        │  │
│  │   404 — Page Not Found                                 │  │
│  │                                                        │  │
│  │   $ ls                                                 │  │
│  │   home/  projects/  skills/  contact/                  │  │
│  │                                                        │  │
│  │   [← Back Home]                                        │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  $ _                                                         │
└──────────────────────────────────────────────────────────────┘
```

---

### 16. Console Easter Egg

```typescript
// src/main.tsx

console.log(`
%c
╔═══════════════════════════════════════════╗
║                                           ║
║   Hey, fellow developer! 👋               ║
║                                           ║
║   Curious about the code?                 ║
║   → github.com/rupayan/portfolio          ║
║                                           ║
║   Want to work together?                  ║
║   → hello@rupayan.dev                     ║
║                                           ║
╚═══════════════════════════════════════════╝
`, 'color: #bd93f9; font-family: monospace;')
```

---

### 17. Meta / SEO

```html
<!-- index.html -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>Rupayan Roy — Software Engineer</title>
  <meta name="description" content="Senior Software Engineer with 6 years of experience. Building things with Python, React, and TypeScript." />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Rupayan Roy — Software Engineer" />
  <meta property="og:description" content="Senior Software Engineer with 6 years of experience." />
  <meta property="og:image" content="https://rupayan.dev/og-image.png" />
  <meta property="og:url" content="https://rupayan.dev" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Rupayan Roy — Software Engineer" />
  <meta name="twitter:description" content="Senior Software Engineer with 6 years of experience." />
  <meta name="twitter:image" content="https://rupayan.dev/og-image.png" />
</head>
```

---

### 18. Accessibility

| Feature | Implementation |
|---------|----------------|
| **Reduced motion** | Respect `prefers-reduced-motion` |
| **Semantic HTML** | Proper headings, landmarks, labels |
| **Keyboard nav** | All interactive elements focusable |
| **Focus rings** | Visible focus states (accent color) |
| **Color contrast** | All themes meet WCAG AA |
| **Screen reader** | Proper aria-labels |

---

## Component Specifications

### TerminalHeader

```tsx
<header className="flex items-center justify-between px-4 py-3 
                   bg-[var(--bg-secondary)] border-b border-[var(--border)] 
                   rounded-t-lg">
  {/* Window buttons */}
  <div className="flex gap-2">
    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
    <span className="w-3 h-3 rounded-full bg-[#27ca40]" />
  </div>
  
  {/* Title */}
  <span className="text-[var(--text-dim)] text-sm font-mono">
    rupayan@portfolio:~
  </span>
  
  {/* Theme picker */}
  <ThemePicker />
</header>
```

### TerminalToggle (Mobile)

```tsx
<button 
  onClick={() => setTerminalOpen(true)}
  className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
             bg-[var(--accent)] text-[var(--bg)]
             flex items-center justify-center
             shadow-lg md:hidden z-40"
  aria-label="Open terminal"
>
  <Terminal size={24} />
</button>
```

### TerminalInput

```tsx
<div className="flex items-center gap-2 text-[var(--text)]">
  <span className="text-[var(--accent)]">$</span>
  <input
    ref={inputRef}
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    inputMode="text"
    autoCapitalize="none"
    autoCorrect="off"
    spellCheck={false}
    placeholder="Type a command..."
    className="flex-1 bg-transparent outline-none 
               placeholder:text-[var(--text-dim)]"
  />
  <span className="animate-blink text-[var(--accent)]">_</span>
</div>
```

### BentoCard

```tsx
<div className="bg-[var(--bg-secondary)] border border-[var(--border)] 
                rounded-lg p-4 
                hover:border-[var(--accent)] hover:-translate-y-1
                transition-all duration-200">
  {/* Command header */}
  <div className="text-[var(--text-dim)] text-sm mb-3">
    $ {command}
  </div>
  
  {/* Content */}
  {children}
</div>
```

### Cursor

```tsx
<span className="inline-block w-2 h-5 bg-[var(--accent)] animate-blink" />
```

---

## CSS Setup

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

* {
  transition: background-color 0.2s ease, 
              color 0.2s ease, 
              border-color 0.2s ease;
}

body {
  font-family: 'JetBrains Mono', monospace;
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* Selection matches theme */
::selection {
  background-color: var(--accent);
  color: var(--bg);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Blink animation */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
```

---

## Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview production
npm run preview
```

---

## Build Milestones

- [ ] Project scaffold (Vite + React + TS + Tailwind)
- [ ] Theme system (context + 5 themes + localStorage)
- [ ] Boot sequence (first visit only)
- [ ] Terminal header + window wrapper
- [ ] ASCII art (responsive: full name / initials)
- [ ] Bento grid layout
- [ ] Hero card (bio + status + links)
- [ ] Skills card
- [ ] Project cards (with coming soon state)
- [ ] Contact card
- [ ] Terminal input (desktop: fixed, mobile: drawer)
- [ ] Command chips with icons
- [ ] Command parser + all commands
- [ ] Easter eggs
- [ ] Toast notifications
- [ ] Keyboard shortcuts
- [ ] 404 page
- [ ] Accessibility (reduced motion, keyboard nav)
- [ ] Meta tags + OG image + favicon
- [ ] Mobile testing
- [ ] Deploy to Vercel

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1s |
| Largest Contentful Paint | < 1.5s |
| Bundle size | < 100KB gzipped |
| Lighthouse score | > 95 |

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Auto-deploy on push
4. Add custom domain: rupayan.dev

---

*Last updated: January 2025*
