import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import { useSound } from '../../context/SoundContext'

interface TerminalInputProps {
  onSubmit: (command: string) => void
  onHistoryUp: () => string | null
  onHistoryDown: () => string | null
  onResetHistory: () => void
}

export function TerminalInput({ onSubmit, onHistoryUp, onHistoryDown, onResetHistory }: TerminalInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { playTyping } = useSound()

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      onSubmit(input)
      setInput('')
      onResetHistory()
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevCommand = onHistoryUp()
      if (prevCommand !== null) {
        setInput(prevCommand)
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextCommand = onHistoryDown()
      if (nextCommand !== null) {
        setInput(nextCommand)
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // Play typing sound only when adding characters
    if (newValue.length > input.length) {
      playTyping()
    }
    setInput(newValue)
  }

  return (
    <div className="flex items-center gap-2 text-[var(--text)]">
      <span className="text-[var(--accent)]">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputMode="text"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder="Type a command..."
        className="flex-1 bg-transparent outline-none placeholder:text-[var(--text-dim)] focus:ring-0"
      />
      <span className="animate-blink text-[var(--accent)]">_</span>
    </div>
  )
}
