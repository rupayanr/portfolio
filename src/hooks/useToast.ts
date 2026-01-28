import { useState, useCallback, useRef, useEffect } from 'react'
import type { Toast, ToastType } from '../types'

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map())

  // Cleanup all timeouts on unmount
  useEffect(() => {
    const refs = timeoutRefs.current
    return () => {
      refs.forEach(timeout => clearTimeout(timeout))
      refs.clear()
    }
  }, [])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    const toast: Toast = { id, message, type }

    setToasts(prev => [...prev, toast])

    // Auto-dismiss after 3 seconds
    const timeout = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
      timeoutRefs.current.delete(id)
    }, 3000)

    timeoutRefs.current.set(id, timeout)
  }, [])

  const removeToast = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutRefs.current.delete(id)
    }
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}
