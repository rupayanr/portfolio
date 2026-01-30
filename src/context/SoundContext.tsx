import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'

interface SoundContextType {
  isMuted: boolean
  setMuted: (muted: boolean) => void
  toggleMute: () => void
  playTyping: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('soundMuted')
    return saved === 'true'
  })

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
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Initialize audio elements
    typingAudioRef.current = new Audio('/sounds/typing.wav')
    typingAudioRef.current.volume = 0.3

    ambientAudioRef.current = new Audio('/sounds/ambient.mp3')
    ambientAudioRef.current.volume = 0.15
    ambientAudioRef.current.loop = true

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        ambientAudioRef.current = null
      }
      typingAudioRef.current = null
    }
  }, [])

  // Start ambient sound on first user interaction
  useEffect(() => {
    const startAmbient = () => {
      if (hasInteracted.current) return
      hasInteracted.current = true

      if (!isMuted && !prefersReducedMotion.current && ambientAudioRef.current) {
        ambientAudioRef.current.play().catch(() => {
          // Autoplay blocked - browser policy
        })
      }

      // Remove listeners after first interaction
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
      } else if (hasInteracted.current) {
        // Only play if user has already interacted
        ambientAudioRef.current.play().catch(() => {
          // Autoplay blocked
        })
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
      // Clone the audio to allow overlapping sounds
      const clone = typingAudioRef.current.cloneNode() as HTMLAudioElement
      clone.volume = 0.2 + Math.random() * 0.1 // Slight volume variation
      clone.playbackRate = 0.9 + Math.random() * 0.2 // Slight pitch variation
      clone.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [isMuted])

  return (
    <SoundContext.Provider value={{ isMuted, setMuted, toggleMute, playTyping }}>
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
