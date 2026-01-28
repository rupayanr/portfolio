import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command } from 'lucide-react'
import { commandChips } from '../../data/commands'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onCommandSelect: (command: string) => void
}

export function CommandPalette({ isOpen, onClose, onCommandSelect }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCommands = commandChips.filter(c =>
    c.cmd.toLowerCase().includes(search.toLowerCase()) ||
    c.label.toLowerCase().includes(search.toLowerCase())
  )

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setSelectedIndex(0)
      const timer = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) {
      if (e.key === 'Escape') onClose()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => (i + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      onCommandSelect(filteredCommands[selectedIndex].cmd)
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-md z-50"
          >
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden mx-4">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search size={18} className="text-[var(--text-dim)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent outline-none text-[var(--text)] placeholder:text-[var(--text-dim)]"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[var(--bg)] rounded text-xs text-[var(--text-dim)]">
                  esc
                </kbd>
              </div>

              {/* Commands list */}
              <div className="max-h-64 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <p className="text-[var(--text-dim)] text-sm text-center py-4">
                    No commands found
                  </p>
                ) : (
                  filteredCommands.map((c, index) => {
                    const Icon = c.icon
                    return (
                      <button
                        key={c.cmd}
                        onClick={() => {
                          onCommandSelect(c.cmd)
                          onClose()
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                          index === selectedIndex
                            ? 'bg-[var(--accent)] text-[var(--bg)]'
                            : 'text-[var(--text)] hover:bg-[var(--bg)]'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{c.label}</span>
                        <span className={`ml-auto text-xs ${
                          index === selectedIndex ? 'opacity-70' : 'text-[var(--text-dim)]'
                        }`}>
                          {c.cmd}
                        </span>
                      </button>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)] text-xs text-[var(--text-dim)]">
                <div className="flex items-center gap-2">
                  <Command size={12} />
                  <span>K to open</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
