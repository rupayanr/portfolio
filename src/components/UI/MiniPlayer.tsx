import { useState, useEffect } from 'react'
import { useSound } from '../../context/SoundContext'
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'

export function MiniPlayer() {
  const { currentTrack, tracks, nextTrack, prevTrack, isPlaying, isMuted, toggleMute } = useSound()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!isPlaying || isMuted) return
    const interval = setInterval(() => setFrame(i => (i + 1) % 4), 150)
    return () => clearInterval(interval)
  }, [isPlaying, isMuted])

  const disc = isPlaying && !isMuted 
    ? ['◐', '◓', '◑', '◒'][frame] 
    : '○'

  const track = tracks[currentTrack]

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-md text-xs">
      {/* Spinning disc */}
      <span className="text-[var(--accent)] text-sm w-4">{disc}</span>
      
      {/* Track controls */}
      <button onClick={prevTrack} className="text-[var(--text-dim)] hover:text-[var(--accent)]" aria-label="Previous">
        <ChevronLeft size={14} />
      </button>
      
      <span className="text-[var(--text-dim)] min-w-[60px] text-center text-[10px]">
        {track.name}
      </span>
      
      <button onClick={nextTrack} className="text-[var(--text-dim)] hover:text-[var(--accent)]" aria-label="Next">
        <ChevronRight size={14} />
      </button>

      {/* Mute toggle */}
      <button 
        onClick={toggleMute} 
        className="text-[var(--text-dim)] hover:text-[var(--accent)] ml-1"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </div>
  )
}
