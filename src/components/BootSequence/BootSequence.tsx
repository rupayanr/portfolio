import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootSequenceProps {
  onComplete: () => void
}

const bootLines = [
  { text: 'Loading themes', delay: 400 },
  { text: 'Indexing projects', delay: 600 },
  { text: 'Brewing coffee', delay: 800 },
  { text: 'Ready', delay: 400 },
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 500)
    return () => clearTimeout(skipTimer)
  }, [])

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setProgress(((currentLine + 1) / bootLines.length) * 100)
      }, bootLines[currentLine].delay)
      return () => clearTimeout(timer)
    } else {
      const completeTimer = setTimeout(onComplete, 500)
      return () => clearTimeout(completeTimer)
    }
  }, [currentLine, onComplete])

  const handleSkip = () => {
    onComplete()
  }

  useEffect(() => {
    const handleKeyDown = () => handleSkip()
    const handleClick = () => handleSkip()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center z-50"
      >
        <div className="w-full max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-xl font-bold text-[var(--text)]">RUPAYAN OS v1.0.0</h1>
            <div className="w-32 h-px bg-[var(--border)] mx-auto mt-2" />
          </motion.div>

          <div className="mb-6">
            <div className="w-full h-2 bg-[var(--bg-secondary)] rounded overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-[var(--text-dim)] text-sm mt-2 text-center">
              Initializing...
            </p>
          </div>

          <div className="space-y-2">
            {bootLines.slice(0, currentLine).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-[var(--text)]"
              >
                <span className="text-[var(--accent)]">✓</span>
                <span>{line.text}</span>
              </motion.div>
            ))}
          </div>

          {showSkip && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--text-dim)] text-sm text-center mt-8"
            >
              Click anywhere or press any key to continue
              <span className="animate-blink">_</span>
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
