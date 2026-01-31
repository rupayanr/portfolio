import { commandChips } from '../../data/commands'

interface CommandChipsProps {
  onCommandClick: (command: string) => void
}

export function CommandChips({ onCommandClick }: CommandChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
      {commandChips.map(({ cmd, icon: Icon, label }) => (
        <button
          key={cmd}
          onClick={() => onCommandClick(cmd)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-md text-sm hover:border-[var(--accent)] transition-colors"
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  )
}
