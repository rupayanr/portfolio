import { Terminal } from 'lucide-react'

interface TerminalToggleProps {
  onClick: () => void
}

export function TerminalToggle({ onClick }: TerminalToggleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center shadow-lg md:hidden z-40"
      aria-label="Open terminal"
    >
      <Terminal size={24} />
    </button>
  )
}
