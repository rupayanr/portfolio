import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCommands } from './useCommands'
import { ThemeProvider } from '../context/ThemeContext'
import { AvailabilityProvider } from '../context/AvailabilityContext'
import { SoundProvider } from '../context/SoundContext'
import type { ReactNode } from 'react'

// Wrapper with all required providers
function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AvailabilityProvider>
        <SoundProvider>
          {children}
        </SoundProvider>
      </AvailabilityProvider>
    </ThemeProvider>
  )
}

describe('useCommands', () => {
  const mockAddOutput = vi.fn()
  const mockClearOutputs = vi.fn()
  const mockAddToast = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderUseCommands = () => {
    return renderHook(
      () => useCommands({
        addOutput: mockAddOutput,
        clearOutputs: mockClearOutputs,
        addToast: mockAddToast,
      }),
      { wrapper: Wrapper }
    )
  }

  describe('cat about.txt command', () => {
    it('returns bio content for "cat about.txt"', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('cat about.txt')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.command).toBe('cat about.txt')
      expect(call.type).toBe('info')
    })

    it('also works with "cat about"', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('cat about')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.type).toBe('info')
    })
  })

  describe('experience command', () => {
    it('returns work history for "experience"', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('experience')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.command).toBe('experience')
      expect(call.type).toBe('info')
    })

    it('also works with "exp" alias', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('exp')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.type).toBe('info')
    })
  })

  describe('status command', () => {
    it('shows current status when no argument given', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('status')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.command).toBe('status')
      expect(call.type).toBe('info')
    })

    it('sets status to busy', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('status busy')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toContain('busy')
      expect(call.type).toBe('success')
      expect(mockAddToast).toHaveBeenCalledWith('Status: Currently busy', 'success')
    })

    it('sets status to away', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('status away')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toContain('Away')
      expect(call.type).toBe('success')
    })

    it('sets status to available', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('status available')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toContain('Available')
      expect(call.type).toBe('success')
    })

    it('shows error for invalid status', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('status invalid')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toContain('Unknown status')
      expect(call.type).toBe('error')
    })
  })

  describe('sound command', () => {
    it('shows current sound status when no argument given', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('sound')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.command).toBe('sound')
      expect(call.type).toBe('info')
    })

    it('turns sound on', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('sound on')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toBe('✓ Sound: on')
      expect(call.type).toBe('success')
      expect(mockAddToast).toHaveBeenCalledWith('Sound enabled', 'success')
    })

    it('turns sound off', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('sound off')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toBe('✓ Sound: off')
      expect(call.type).toBe('success')
      expect(mockAddToast).toHaveBeenCalledWith('Sound muted', 'success')
    })

    it('shows error for invalid sound option', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('sound loud')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.output).toContain('Unknown option')
      expect(call.type).toBe('error')
    })
  })

  describe('existing commands still work', () => {
    it('help command works', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('help')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.command).toBe('help')
      expect(call.type).toBe('info')
    })

    it('clear command works', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('clear')
      })

      expect(mockClearOutputs).toHaveBeenCalledTimes(1)
    })

    it('skills command works', () => {
      const { result } = renderUseCommands()

      act(() => {
        result.current.executeCommand('skills')
      })

      expect(mockAddOutput).toHaveBeenCalledTimes(1)
      const call = mockAddOutput.mock.calls[0][0]
      expect(call.type).toBe('info')
    })
  })
})
