import { useState, useEffect } from 'react'
import { useSound } from '../../context/SoundContext'
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'

const RECORD_STOPPED = `   ┌───────────┐
   │ ╭───────╮ │
   │ │ ╭───╮ │ │
   │ │ │ ○ │ │ │
   │ │ ╰───╯ │ │
   │ ╰───────╯ │
   └───────────┘`

const RECORD_SPINNING = [
  `   ┌───────────┐
   │ ╭───────╮ │
   │ │ ─ ● ─ │ │
   │ │  ═══  │ │
   │ │ ─   ─ │ │
   │ ╰───────╯ │
   └───────────┘`,
  `   ┌───────────┐
   │ ╭───────╮ │
   │ │ ╲ ● ╱ │ │
   │ │  ╲╱   │ │
   │ │ ╱   ╲ │ │
   │ ╰───────╯ │
   └───────────┘`,
  `   ┌───────────┐
   │ ╭───────╮ │
   │ │ │ ● │ │ │
   │ │ ║   ║ │ │
   │ │ │   │ │ │
   │ ╰───────╯ │
   └───────────┘`,
  `   ┌───────────┐
   │ ╭───────╮ │
   │ │ ╱ ● ╲ │ │
   │ │  ╱╲   │ │
   │ │ ╲   ╱ │ │
   │ ╰───────╯ │
   └───────────┘`,
]

export function AmbientPlayer() {
  const { currentTrack, tracks, nextTrack, prevTrack, isPlaying, isMuted, toggleMute } = useSound()
  const [frameIndex, setFrameIndex] = useState(0)

  // Animate the record when playing
  useEffect(() => {
    if (!isPlaying || isMuted) {
      setFrameIndex(0)
      return
    }
    const interval = setInterval(() => {
      setFrameIndex(i => (i + 1) % RECORD_SPINNING.length)
    }, 150)
    return () => clearInterval(interval)
  }, [isPlaying, isMuted])

  const track = tracks[currentTrack]

  return (
    <div className="flex flex-col items-center">
      {/* ASCII Record Player */}
      <pre className="text-[var(--accent)] text-[10px] sm:text-xs leading-tight select-none font-mono">
        {isPlaying && !isMuted ? RECORD_SPINNING[frameIndex] : RECORD_STOPPED}
      </pre>

      {/* Track Controls */}
      <div className="flex items-center gap-1 mt-2">
        <button
          onClick={prevTrack}
          className="p-1 hover:text-[var(--accent)] transition-colors text-[var(--text-dim)]"
          aria-label="Previous track"
        >
          <ChevronLeft size={14} />
        </button>
        
        <span className="text-[10px] sm:text-xs text-[var(--text)] min-w-[70px] text-center font-medium">
          {track.name}
        </span>
        
        <button
          onClick={nextTrack}
          className="p-1 hover:text-[var(--accent)] transition-colors text-[var(--text-dim)]"
          aria-label="Next track"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="flex items-center gap-1 mt-2 px-2 py-1 text-[10px] rounded border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        <span className="text-[var(--text-dim)]">{isMuted ? 'unmute' : 'mute'}</span>
      </button>

      {/* Now Playing indicator */}
      {isPlaying && !isMuted && (
        <div className="flex items-center gap-1 mt-2 text-[10px] text-[var(--accent)]">
          <span className="animate-pulse">♫</span>
          <span>playing</span>
        </div>
      )}
    </div>
  )
}
