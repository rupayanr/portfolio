import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'

interface SoundContextType {
  isMuted: boolean
  setMuted: (muted: boolean) => void
  toggleMute: () => void
  playTyping: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

// Module-level audio instances to survive React StrictMode remounts
let ambientAudio: HTMLAudioElement | null = null
let typingAudio: HTMLAudioElement | null = null
let hasUserInteracted = false
let interactionListener: (() => void) | null = null

function getOrCreateAudio() {
  if (!ambientAudio) {
    ambientAudio = new Audio('/sounds/ambient.ogg')
    ambientAudio.volume = 0.2
    ambientAudio.loop = true
    ambientAudio.preload = 'auto'
  }
  if (!typingAudio) {
    typingAudio = new Audio('/sounds/typing.wav')
    typingAudio.volume = 0.3
    typingAudio.preload = 'auto'
  }
  return { ambientAudio, typingAudio }
}

// Reset function for testing
export function __resetSoundState() {
  // Remove existing listeners
  if (interactionListener) {
    document.removeEventListener('click', interactionListener, true)
    document.removeEventListener('keydown', interactionListener, true)
    interactionListener = null
  }
  if (ambientAudio) {
    ambientAudio.pause()
    ambientAudio = null
  }
  typingAudio = null
  hasUserInteracted = false
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('soundMuted')
    return saved === 'true'
  })

  const prefersReducedMotion = useRef(false)
  const isMutedRef = useRef(isMuted)

  // Keep ref in sync with state for use in event handlers
  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
      if (e.matches && ambientAudio) {
        ambientAudio.pause()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Initialize audio and set up interaction listener
  useEffect(() => {
    const { ambientAudio: ambient } = getOrCreateAudio()

    // Only attach listeners once (module-level check)
    if (!interactionListener) {
      const tryPlayAmbient = () => {
        if (hasUserInteracted) return
        hasUserInteracted = true

        // Remove listeners after first interaction
        if (interactionListener) {
          document.removeEventListener('click', interactionListener, true)
          document.removeEventListener('keydown', interactionListener, true)
        }

        if (!isMutedRef.current && !prefersReducedMotion.current && ambient) {
          ambient.play().catch((err) => {
            console.warn('Failed to play ambient sound:', err)
          })
        }
      }

      interactionListener = tryPlayAmbient
      document.addEventListener('click', tryPlayAmbient, true)
      document.addEventListener('keydown', tryPlayAmbient, true)
    }

    // No cleanup - we want audio to persist across StrictMode remounts
  }, [])

  // Handle mute/unmute
  useEffect(() => {
    localStorage.setItem('soundMuted', String(isMuted))

    if (prefersReducedMotion.current) return

    if (ambientAudio) {
      if (isMuted) {
        ambientAudio.pause()
      } else if (hasUserInteracted) {
        ambientAudio.play().catch((err) => {
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

    const { typingAudio: typing } = getOrCreateAudio()
    if (typing) {
      const clone = typing.cloneNode() as HTMLAudioElement
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
