import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { TerminalHeader } from './components/Terminal/TerminalHeader'
import { TerminalWindow } from './components/Terminal/TerminalWindow'
import { TerminalToggle } from './components/Terminal/TerminalToggle'
import { TerminalDrawer } from './components/Terminal/TerminalDrawer'
import { BentoGrid } from './components/Bento/BentoGrid'
import { BootSequence } from './components/BootSequence/BootSequence'
import { ToastContainer } from './components/UI/ToastContainer'
import { CommandPalette } from './components/UI/CommandPalette'
import { NotFound } from './components/NotFound'
import { useToast } from './hooks/useToast'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './context/ThemeContext'
import { useTerminal } from './hooks/useTerminal'
import { useCommands } from './hooks/useCommands'

function HomePage() {
  const [hasBooted, setHasBooted] = useLocalStorage('hasBooted', false)
  const [showBoot, setShowBoot] = useState(!hasBooted)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const { toasts, addToast, removeToast } = useToast()
  const { cycleTheme } = useTheme()

  // Shared terminal state for command palette
  const terminal = useTerminal()
  const { executeCommand } = useCommands({
    addOutput: terminal.addOutput,
    clearOutputs: terminal.clearOutputs,
    addToast,
  })

  // Show welcome message on first load (after boot)
  const [hasShownWelcome, setHasShownWelcome] = useLocalStorage('hasShownWelcome', false)

  useEffect(() => {
    if (!showBoot && !hasShownWelcome) {
      terminal.addOutput({
        id: 'welcome',
        command: 'welcome',
        output: (
          <div className="space-y-1">
            <p className="text-[var(--accent)]">Welcome to my portfolio! 👋</p>
            <p className="text-[var(--text-dim)]">
              Type <span className="text-[var(--accent)]">help</span> for commands or press{' '}
              <kbd className="px-1.5 py-0.5 bg-[var(--bg)] rounded text-xs">⌘K</kbd> to open the command palette.
            </p>
          </div>
        ),
        type: 'info',
      })
      setHasShownWelcome(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBoot, hasShownWelcome, setHasShownWelcome, terminal.addOutput])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 't' key cycles theme (when not focused on input)
      if (e.key === 't' && document.activeElement?.tagName !== 'INPUT' && !isPaletteOpen) {
        cycleTheme()
      }

      // Cmd/Ctrl + K opens command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsPaletteOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cycleTheme, isPaletteOpen])

  const handleBootComplete = () => {
    setShowBoot(false)
    setHasBooted(true)
  }

  const handlePaletteCommand = (cmd: string) => {
    terminal.addToHistory(cmd)
    executeCommand(cmd)
  }

  if (showBoot) {
    return <BootSequence onComplete={handleBootComplete} />
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[var(--bg)]">
        <TerminalHeader />
      </div>

      {/* Main Content */}
      <main>
        <BentoGrid addToast={addToast} />
      </main>

      {/* Desktop Terminal */}
      <TerminalWindow addToast={addToast} sharedTerminal={terminal} />

      {/* Mobile Terminal Toggle */}
      <TerminalToggle onClick={() => setIsDrawerOpen(true)} />

      {/* Mobile Terminal Drawer */}
      <TerminalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        addToast={addToast}
        sharedTerminal={terminal}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onCommandSelect={handlePaletteCommand}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
