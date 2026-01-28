import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { TerminalOutput } from './TerminalOutput'
import { TerminalInput } from './TerminalInput'
import { CommandChips } from './CommandChips'
import { useTerminal } from '../../hooks/useTerminal'
import { useCommands } from '../../hooks/useCommands'

interface TerminalDrawerProps {
  isOpen: boolean
  onClose: () => void
  addToast: (message: string, type: 'success' | 'info' | 'error') => void
  sharedTerminal?: ReturnType<typeof useTerminal>
}

export function TerminalDrawer({ isOpen, onClose, addToast, sharedTerminal }: TerminalDrawerProps) {
  const localTerminal = useTerminal()
  const terminal = sharedTerminal || localTerminal

  const {
    outputs,
    addOutput,
    clearOutputs,
    addToHistory,
    getPreviousCommand,
    getNextCommand,
    resetHistoryIndex,
  } = terminal

  const { executeCommand } = useCommands({ addOutput, clearOutputs, addToast })

  const handleCommand = (command: string) => {
    addToHistory(command)
    executeCommand(command)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

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
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-h-[60vh] bg-[var(--bg-secondary)] border-t border-[var(--border)] rounded-t-xl z-50 md:hidden overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <span className="text-[var(--text-dim)] text-sm">Terminal</span>
              <button
                onClick={onClose}
                className="p-1 text-[var(--text-dim)] hover:text-[var(--text)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(60vh-60px)]">
              <TerminalOutput outputs={outputs} onClear={clearOutputs} />
              <TerminalInput
                onSubmit={handleCommand}
                onHistoryUp={getPreviousCommand}
                onHistoryDown={getNextCommand}
                onResetHistory={resetHistoryIndex}
              />
              <CommandChips onCommandClick={handleCommand} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
