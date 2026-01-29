import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { CommandOutput } from '../../types'

interface TerminalOutputProps {
  outputs: CommandOutput[]
  onClear: () => void
}

export function TerminalOutput({ outputs, onClear }: TerminalOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [outputs])

  if (outputs.length === 0) return null

  return (
    <div className="relative mb-4">
      <button
        onClick={onClear}
        className="absolute -top-1 right-0 p-1 text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg)] rounded transition-colors"
        aria-label="Clear output"
        title="Clear output"
      >
        <X size={16} />
      </button>
      <div
        ref={scrollRef}
        className="space-y-3 max-h-48 overflow-y-auto scroll-smooth pr-6"
      >
        {outputs.map((output, index) => (
          <motion.div
            key={output.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`space-y-1 ${index < outputs.length - 1 ? 'pb-3 border-b border-[var(--border)]' : ''}`}
          >
            <div className="text-[var(--text-dim)] text-sm">
              <span className="text-[var(--accent)]">$</span> {output.command}
            </div>
            <div className="text-[var(--text)] pl-4">{output.output}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
