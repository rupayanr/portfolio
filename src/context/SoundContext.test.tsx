import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, cleanup } from '@testing-library/react'
import { SoundProvider, useSound } from './SoundContext'

// Store mock audio instances to verify calls
let mockAmbientAudio: ReturnType<typeof createMockAudioInstance>
let mockTypingAudio: ReturnType<typeof createMockAudioInstance>

function createMockAudioInstance() {
  return {
    src: '',
    volume: 1,
    loop: false,
    paused: true,
    playbackRate: 1,
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    cloneNode: vi.fn().mockImplementation(() => createMockAudioInstance()),
  }
}

// Override Audio mock to capture instances
beforeEach(() => {
  mockTypingAudio = createMockAudioInstance()
  mockAmbientAudio = createMockAudioInstance()

  let callCount = 0
  window.Audio = vi.fn().mockImplementation(() => {
    callCount++
    // First call is typing audio, second is ambient
    return callCount === 1 ? mockTypingAudio : mockAmbientAudio
  }) as unknown as typeof Audio
})

afterEach(() => {
  cleanup()
})

// Test component to access context
function TestComponent() {
  const { isMuted, setMuted, toggleMute, playTyping } = useSound()
  return (
    <div>
      <span data-testid="muted">{isMuted ? 'true' : 'false'}</span>
      <button onClick={() => setMuted(true)}>Mute</button>
      <button onClick={() => setMuted(false)}>Unmute</button>
      <button onClick={toggleMute}>Toggle</button>
      <button onClick={playTyping}>Play Typing</button>
    </div>
  )
}

describe('SoundContext', () => {
  it('provides default unmuted state', () => {
    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    expect(screen.getByTestId('muted')).toHaveTextContent('false')
  })

  it('can mute sounds', () => {
    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    act(() => {
      screen.getByText('Mute').click()
    })

    expect(screen.getByTestId('muted')).toHaveTextContent('true')
  })

  it('can unmute sounds', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('true')

    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    act(() => {
      screen.getByText('Unmute').click()
    })

    expect(screen.getByTestId('muted')).toHaveTextContent('false')
  })

  it('can toggle mute state', () => {
    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    expect(screen.getByTestId('muted')).toHaveTextContent('false')

    act(() => {
      screen.getByText('Toggle').click()
    })

    expect(screen.getByTestId('muted')).toHaveTextContent('true')

    act(() => {
      screen.getByText('Toggle').click()
    })

    expect(screen.getByTestId('muted')).toHaveTextContent('false')
  })

  it('persists mute state to localStorage', () => {
    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    act(() => {
      screen.getByText('Mute').click()
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('soundMuted', 'true')
  })

  it('loads mute state from localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('true')

    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    expect(screen.getByTestId('muted')).toHaveTextContent('true')
  })

  it('playTyping does not throw when muted', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('true')

    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    )

    expect(() => {
      act(() => {
        screen.getByText('Play Typing').click()
      })
    }).not.toThrow()
  })

  it('throws error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'useSound must be used within a SoundProvider'
    )

    consoleError.mockRestore()
  })

  describe('ambient sound', () => {
    it('creates audio elements with correct settings', () => {
      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      expect(window.Audio).toHaveBeenCalledTimes(2)
      expect(mockTypingAudio.volume).toBe(0.3)
      expect(mockAmbientAudio.volume).toBe(0.2)
      expect(mockAmbientAudio.loop).toBe(true)
    })

    it('plays ambient sound on first click when not muted', async () => {
      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      expect(mockAmbientAudio.play).not.toHaveBeenCalled()

      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      expect(mockAmbientAudio.play).toHaveBeenCalledTimes(1)
    })

    it('plays ambient sound on first keydown when not muted', async () => {
      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      expect(mockAmbientAudio.play).not.toHaveBeenCalled()

      await act(async () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
      })

      expect(mockAmbientAudio.play).toHaveBeenCalledTimes(1)
    })

    it('does NOT play ambient sound when initially muted', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue('true')

      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      expect(mockAmbientAudio.play).not.toHaveBeenCalled()
    })

    it('only plays ambient sound once on repeated interactions', async () => {
      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      await act(async () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
      })

      expect(mockAmbientAudio.play).toHaveBeenCalledTimes(1)
    })

    it('pauses ambient sound when muted', async () => {
      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      // First interact to start ambient sound
      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      // Now mute
      await act(async () => {
        screen.getByText('Mute').click()
      })

      expect(mockAmbientAudio.pause).toHaveBeenCalled()
    })

    it('resumes ambient sound when unmuted after interaction', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue('true')

      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      // Interact while muted (shouldn't play)
      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      expect(mockAmbientAudio.play).not.toHaveBeenCalled()

      // Unmute - should now play since we've interacted
      await act(async () => {
        screen.getByText('Unmute').click()
      })

      expect(mockAmbientAudio.play).toHaveBeenCalledTimes(1)
    })
  })

  describe('typing sound', () => {
    it('plays typing sound when not muted', async () => {
      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      await act(async () => {
        screen.getByText('Play Typing').click()
      })

      // Should have called cloneNode to create a new audio instance
      expect(mockTypingAudio.cloneNode).toHaveBeenCalled()
    })

    it('does NOT play typing sound when muted', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue('true')

      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      await act(async () => {
        screen.getByText('Play Typing').click()
      })

      expect(mockTypingAudio.cloneNode).not.toHaveBeenCalled()
    })
  })

  describe('reduced motion', () => {
    it('does NOT play ambient sound when reduced motion is preferred', async () => {
      // Mock reduced motion preference
      vi.mocked(window.matchMedia).mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      await act(async () => {
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      expect(mockAmbientAudio.play).not.toHaveBeenCalled()
    })

    it('does NOT play typing sound when reduced motion is preferred', async () => {
      vi.mocked(window.matchMedia).mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      render(
        <SoundProvider>
          <TestComponent />
        </SoundProvider>
      )

      await act(async () => {
        screen.getByText('Play Typing').click()
      })

      expect(mockTypingAudio.cloneNode).not.toHaveBeenCalled()
    })
  })
})
