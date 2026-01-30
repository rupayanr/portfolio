import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'

export interface AmbientTrack {
  id: string
  name: string
  file: string
}

export const AMBIENT_TRACKS: AmbientTrack[] = [
  { id: 'serenity', name: 'Serenity', file: '/sounds/ambient/serenity.ogg' },
  { id: 'voltaic', name: 'Voltaic', file: '/sounds/ambient/voltaic.ogg' },
  { id: 'space', name: 'Space', file: '/sounds/ambient/space-music.ogg' },
  { id: 'coldsleep', name: 'Coldsleep', file: '/sounds/ambient/coldsleep.ogg' },
]

interface SoundContextType {
  isMuted: boolean
  isPlaying: boolean
  setMuted: (muted: boolean) => void
  toggleMute: () => void
  playTyping: () => void
  currentTrack: number
  tracks: AmbientTrack[]
  nextTrack: () => void
  prevTrack: () => void
  setTrack: (index: number) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('soundMuted')
    return saved === 'true'
  })
  const [currentTrack, setCurrentTrack] = useState(() => {
    const saved = localStorage.getItem('ambientTrack')
    const index = saved ? parseInt(saved, 10) : 0
    return isNaN(index) ? 0 : index
  })
  const [isPlaying, setIsPlaying] = useState(false)

  const typingAudioRef = useRef<HTMLAudioElement | null>(null)
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null)
  const prefersReducedMotion = useRef(false)
  const hasInteracted = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
      if (e.matches && ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        setIsPlaying(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Initialize typing audio
    typingAudioRef.current = new Audio('/sounds/typing.wav')
    typingAudioRef.current.volume = 0.3

    return () => {
      typingAudioRef.current = null
    }
  }, [])

  // Initialize and switch ambient tracks
  useEffect(() => {
    const track = AMBIENT_TRACKS[currentTrack]
    const wasPlaying = ambientAudioRef.current && !ambientAudioRef.current.paused

    // Pause current track
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause()
    }

    // Create new audio element
    ambientAudioRef.current = new Audio(track.file)
    ambientAudioRef.current.volume = 0.2
    ambientAudioRef.current.loop = true

    // Resume playing if it was playing before
    if ((wasPlaying || (hasInteracted.current && !isMuted)) && !prefersReducedMotion.current) {
      ambientAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }

    localStorage.setItem('ambientTrack', String(currentTrack))

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        ambientAudioRef.current = null
      }
    }
  }, [currentTrack, isMuted])

  // Start ambient sound on first user interaction
  useEffect(() => {
    const startAmbient = () => {
      if (hasInteracted.current) return
      hasInteracted.current = true

      if (!isMuted && !prefersReducedMotion.current && ambientAudioRef.current) {
        ambientAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }

      document.removeEventListener('click', startAmbient)
      document.removeEventListener('keydown', startAmbient)
    }

    document.addEventListener('click', startAmbient)
    document.addEventListener('keydown', startAmbient)

    return () => {
      document.removeEventListener('click', startAmbient)
      document.removeEventListener('keydown', startAmbient)
    }
  }, [isMuted])

  useEffect(() => {
    localStorage.setItem('soundMuted', String(isMuted))

    if (prefersReducedMotion.current) return

    if (ambientAudioRef.current) {
      if (isMuted) {
        ambientAudioRef.current.pause()
        setIsPlaying(false)
      } else if (hasInteracted.current) {
        ambientAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    }
  }, [isMuted])

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const playTyping = useCallback(() => {
    if (isMuted || prefersReducedMotion.current) return

    if (typingAudioRef.current) {
      const clone = typingAudioRef.current.cloneNode() as HTMLAudioElement
      clone.volume = 0.2 + Math.random() * 0.1
      clone.playbackRate = 0.9 + Math.random() * 0.2
      clone.play().catch(() => {})
    }
  }, [isMuted])

  const nextTrack = useCallback(() => {
    setCurrentTrack(prev => (prev + 1) % AMBIENT_TRACKS.length)
  }, [])

  const prevTrack = useCallback(() => {
    setCurrentTrack(prev => (prev - 1 + AMBIENT_TRACKS.length) % AMBIENT_TRACKS.length)
  }, [])

  const setTrack = useCallback((index: number) => {
    if (index >= 0 && index < AMBIENT_TRACKS.length) {
      setCurrentTrack(index)
    }
  }, [])

  return (
    <SoundContext.Provider value={{
      isMuted,
      isPlaying,
      setMuted,
      toggleMute,
      playTyping,
      currentTrack,
      tracks: AMBIENT_TRACKS,
      nextTrack,
      prevTrack,
      setTrack,
    }}>
      {children}
    </SoundContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
