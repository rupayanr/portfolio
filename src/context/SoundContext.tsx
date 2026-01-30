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
  const isMutedRef = useRef(isMuted)

  // Keep ref in sync with state for use in event handlers
  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  useEffect(() => {
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
    typingAudioRef.current = new Audio('/sounds/typing.wav')
    typingAudioRef.current.volume = 0.3
    typingAudioRef.current.preload = 'auto'

    ambientAudioRef.current = new Audio('/sounds/ambient.ogg')
    ambientAudioRef.current.volume = 0.2
    ambientAudioRef.current.loop = true
    ambientAudioRef.current.preload = 'auto'

    // Trigger load
    ambientAudioRef.current.load()
    typingAudioRef.current.load()

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        ambientAudioRef.current = null
      }
      typingAudioRef.current = null
    }
  }, [])

  // Handle first user interaction to start ambient sound
  useEffect(() => {
    const startAmbient = () => {
      if (hasInteracted.current) return
      hasInteracted.current = true

      // Use ref to get current mute state (avoids stale closure)
      if (!isMutedRef.current && !prefersReducedMotion.current && ambientAudioRef.current) {
        // Check if audio is ready, if not wait for it
        const audio = ambientAudioRef.current
        if (audio.readyState >= 2) {
          // HAVE_CURRENT_DATA or higher - can play
          audio.play().catch((err) => {
            console.warn('Failed to play ambient sound:', err)
          })
        } else {
          // Wait for audio to be ready
          const playWhenReady = () => {
            audio.play().catch((err) => {
              console.warn('Failed to play ambient sound:', err)
            })
            audio.removeEventListener('canplay', playWhenReady)
          }
          audio.addEventListener('canplay', playWhenReady)
        }
      }

      // Use capture:true to remove listeners properly
      document.removeEventListener('click', startAmbient, true)
      document.removeEventListener('keydown', startAmbient, true)
    }

    // Use capture phase to ensure we catch all interactions
    document.addEventListener('click', startAmbient, true)
    document.addEventListener('keydown', startAmbient, true)

    return () => {
      document.removeEventListener('click', startAmbient, true)
      document.removeEventListener('keydown', startAmbient, true)
    }
  }, []) // No dependencies - uses refs for current values

  useEffect(() => {
    localStorage.setItem('soundMuted', String(isMuted))

    if (prefersReducedMotion.current) return

    if (ambientAudioRef.current) {
      if (isMuted) {
        ambientAudioRef.current.pause()
      } else if (hasInteracted.current) {
        ambientAudioRef.current.play().catch((err) => {
          console.warn('Failed to resume ambient sound:', err)
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
      const clone = typingAudioRef.current.cloneNode() as HTMLAudioElement
      clone.volume = 0.2 + Math.random() * 0.1
      clone.playbackRate = 0.9 + Math.random() * 0.2
      clone.play().catch(() => {})
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
