import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.addToast('Test message', 'success')
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Test message')
    expect(result.current.toasts[0].type).toBe('success')
  })

  it('should auto-remove toast after 3 seconds', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.addToast('Test message', 'info')
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('should manually remove a toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.addToast('Test message', 'error')
    })

    const toastId = result.current.toasts[0].id

    act(() => {
      result.current.removeToast(toastId)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('should handle multiple toasts', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.addToast('First', 'info')
      result.current.addToast('Second', 'success')
      result.current.addToast('Third', 'error')
    })

    expect(result.current.toasts).toHaveLength(3)
  })

  it('should default to info type', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.addToast('Test message')
    })

    expect(result.current.toasts[0].type).toBe('info')
  })
})
