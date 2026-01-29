import { Link, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'
import { TerminalHeader } from './Terminal/TerminalHeader'

export function NotFound() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <TerminalHeader />

        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] border-t-0 rounded-b-lg p-4 sm:p-6 font-mono">
          {/* Command that was tried */}
          <div className="text-[var(--text-dim)] mb-1">
            <span className="text-[var(--accent)]">$</span> cd {location.pathname}
          </div>

          {/* Error message */}
          <div className="text-red-400 mb-4">
            bash: cd: {location.pathname}: No such file or directory
          </div>

          {/* 404 ASCII art */}
          <pre className="text-[var(--accent)] text-xs sm:text-sm mb-4 overflow-x-auto">
{`
 _  _    ___  _  _
| || |  / _ \\| || |
| || |_| | | | || |_
|__   _| | | |__   _|
   | | | |_| |  | |
   |_|  \\___/   |_|
`}
          </pre>

          {/* Help suggestion */}
          <div className="text-[var(--text-dim)] mb-1">
            <span className="text-[var(--accent)]">$</span> ls ~/
          </div>
          <div className="text-[var(--text)] mb-4">
            <span className="text-blue-400">home/</span>  <span className="text-blue-400">projects/</span>  <span className="text-blue-400">skills/</span>  <span className="text-blue-400">contact/</span>
          </div>

          <div className="text-[var(--text-dim)] mb-4">
            <span className="text-[var(--accent)]">$</span> <span className="text-[var(--text)]">echo "Let's get you back on track"</span>
          </div>

          {/* Back home link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] rounded-md hover:opacity-90 transition-opacity font-medium text-sm"
          >
            <Home size={16} />
            cd ~/home
          </Link>

          {/* Blinking cursor */}
          <div className="flex items-center gap-2 mt-6 text-[var(--text)]">
            <span className="text-[var(--accent)]">$</span>
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
