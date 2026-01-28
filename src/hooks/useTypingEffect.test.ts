import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTypingEffect } from './useTypingEffect'

describe('useTypingEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should start with empty displayed text', () => {
    const { result } = renderHook(() => useTypingEffect('Hello'))

    expect(result.current.displayedText).toBe('')
    expect(result.current.isComplete).toBe(false)
  })

  it('should type text character by character', () => {
    const { result } = renderHook(() => useTypingEffect('Hi', 50, 0))

    // Initial state
    expect(result.current.displayedText).toBe('')

    // After first character
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(result.current.displayedText).toBe('H')

    // After second character
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(result.current.displayedText).toBe('Hi')

    // isComplete is set on the next interval tick after all chars are typed
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(result.current.isComplete).toBe(true)
  })

  it('should respect startDelay', () => {
    const { result } = renderHook(() => useTypingEffect('Hi', 50, 100))

    // Before delay
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(result.current.displayedText).toBe('')

    // After delay + first character
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current.displayedText).toBe('H')
  })

  it('should reset when text changes', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useTypingEffect(text, 50, 0),
      { initialProps: { text: 'Hi' } }
    )

    // Type out "Hi" (2 chars + 1 tick for isComplete)
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(result.current.displayedText).toBe('Hi')
    expect(result.current.isComplete).toBe(true)

    // Change text
    rerender({ text: 'Bye' })
    expect(result.current.displayedText).toBe('')
    expect(result.current.isComplete).toBe(false)
  })

  it('should handle empty string', () => {
    const { result } = renderHook(() => useTypingEffect('', 50, 0))

    act(() => {
      vi.advanceTimersByTime(50)
    })

    expect(result.current.displayedText).toBe('')
    expect(result.current.isComplete).toBe(true)
  })
})
