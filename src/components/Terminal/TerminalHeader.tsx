import { ThemePicker } from '../UI/ThemePicker'

export function TerminalHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)] rounded-t-lg">
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
  )
}
