import { TerminalOutput } from './TerminalOutput'
import { TerminalInput } from './TerminalInput'
import { CommandChips } from './CommandChips'
import { useTerminal } from '../../hooks/useTerminal'
import { useCommands } from '../../hooks/useCommands'

interface TerminalWindowProps {
  addToast: (message: string, type: 'success' | 'info' | 'error') => void
  sharedTerminal?: ReturnType<typeof useTerminal>
}

export function TerminalWindow({ addToast, sharedTerminal }: TerminalWindowProps) {
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

  return (
    <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)] border-t border-[var(--border)] z-40">
      <div className="max-w-6xl mx-auto">
        <div className="px-4 py-4">
          <TerminalOutput outputs={outputs} onClear={clearOutputs} />
          <TerminalInput
            onSubmit={handleCommand}
            onHistoryUp={getPreviousCommand}
            onHistoryDown={getNextCommand}
            onResetHistory={resetHistoryIndex}
          />
          <CommandChips onCommandClick={handleCommand} />
        </div>
      </div>
    </div>
  )
}
