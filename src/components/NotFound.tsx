import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { TerminalHeader } from './Terminal/TerminalHeader'

export function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <TerminalHeader />

        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] border-t-0 rounded-b-lg p-6">
          <div className="text-[var(--text-dim)] mb-4">
            $ cd /unknown-page
          </div>

          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-6">
            <p className="text-red-400 mb-4">
              bash: cd: /unknown-page: No such file or directory
            </p>

            <h1 className="text-2xl font-bold text-[var(--text)] mb-4">
              404 — Page Not Found
            </h1>

            <div className="text-[var(--text-dim)] mb-2">$ ls</div>
            <p className="text-[var(--text)] mb-6">
              home/  projects/  skills/  contact/
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] rounded-md hover:opacity-90 transition-opacity font-medium"
            >
              <ArrowLeft size={16} />
              Back Home
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-4 text-[var(--text)]">
            <span className="text-[var(--accent)]">$</span>
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
