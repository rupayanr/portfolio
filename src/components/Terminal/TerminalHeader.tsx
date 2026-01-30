import { Volume2, VolumeX } from 'lucide-react'
import { ThemePicker } from '../UI/ThemePicker'
import { useSound } from '../../context/SoundContext'

export function TerminalHeader() {
  const { isMuted, toggleMute } = useSound()

  return (
    <header className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)] rounded-t-lg">
      {/* Window buttons */}
      <div className="flex gap-1.5 sm:gap-2">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27ca40]" />
      </div>

      {/* Title */}
      <span className="text-[var(--text-dim)] text-xs sm:text-sm font-mono">
        rupayan@portfolio:~
      </span>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-md hover:bg-[var(--bg)] transition-colors text-[var(--text-dim)] hover:text-[var(--text)]"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <ThemePicker />
      </div>
    </header>
  )
}
