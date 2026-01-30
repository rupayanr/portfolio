import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { SoundProvider, useSound } from './SoundContext'

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
})
