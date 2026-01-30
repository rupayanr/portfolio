import { Github, Linkedin, Mail } from 'lucide-react'
import { BentoCard } from './BentoCard'
import { ASCII_FULL_NAME, ASCII_INITIALS } from '../../assets/ascii'
import { copyToClipboard, EMAIL } from '../../utils/clipboard'

export function HeroCard() {
  const handleCopyEmail = () => {
    copyToClipboard(EMAIL)
  }

  return (
    <BentoCard command="whoami" className="md:col-span-2" id="hero">
      {/* Desktop ASCII - Full Name */}
      <pre
        className="hidden md:block text-xs leading-tight whitespace-pre overflow-x-auto cursor-default ascii-glow"
      >
        {ASCII_FULL_NAME}
      </pre>

      {/* Mobile ASCII - Initials */}
      <pre className="md:hidden text-[var(--accent)] text-xs leading-tight whitespace-pre">
        {ASCII_INITIALS}
      </pre>
      <h1 className="md:hidden text-xl font-bold mt-2 text-[var(--text)]">Rupayan Roy</h1>

      <div className="mt-4 space-y-2">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[var(--text)]">Rupayan Roy</span>
        </div>
        <p className="text-[var(--text-dim)]">Senior Software Engineer</p>
        <p className="text-[var(--text-dim)]">6 years building stuff</p>

        <div className="flex gap-3 mt-4">
          <a
            href="https://github.com/rupayanr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[var(--bg)] border border-[var(--border)] rounded-md hover:border-[var(--accent)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/rupayan-roy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[var(--bg)] border border-[var(--border)] rounded-md hover:border-[var(--accent)] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <button
            onClick={handleCopyEmail}
            className="p-2 bg-[var(--bg)] border border-[var(--border)] rounded-md hover:border-[var(--accent)] transition-colors"
            aria-label="Copy email"
          >
            <Mail size={18} />
          </button>
        </div>
      </div>
    </BentoCard>
  )
}
