import { ThemePicker } from '../UI/ThemePicker'

export function TerminalHeader() {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)] rounded-t-lg">
      {/* Window buttons */}
      <div className="flex gap-1.5 sm:gap-2">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27ca40]" />
      </div>

      {/* Title - shortened on mobile */}
      <span className="text-[var(--text-dim)] text-xs sm:text-sm font-mono">
        <span className="hidden sm:inline">rupayan@portfolio:~</span>
        <span className="sm:hidden">~/portfolio</span>
      </span>

      {/* Theme picker */}
      <ThemePicker />
    </header>
  )
}
