import { useState, useCallback } from 'react'
import type { CommandOutput } from '../types'

export function useTerminal() {
  const [outputs, setOutputs] = useState<CommandOutput[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const addOutput = useCallback((output: CommandOutput) => {
    setOutputs(prev => {
      const newOutputs = [...prev, output]
      // Keep only last 5 outputs
      if (newOutputs.length > 5) {
        return newOutputs.slice(-5)
      }
      return newOutputs
    })
  }, [])

  const clearOutputs = useCallback(() => {
    setOutputs([])
  }, [])

  const addToHistory = useCallback((command: string) => {
    if (command.trim()) {
      setHistory(prev => [...prev, command])
      setHistoryIndex(-1)
    }
  }, [])

  const getPreviousCommand = useCallback(() => {
    if (history.length === 0) return null
    const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
    setHistoryIndex(newIndex)
    return history[newIndex]
  }, [history, historyIndex])

  const getNextCommand = useCallback(() => {
    if (historyIndex === -1 || history.length === 0) return null
    const newIndex = historyIndex + 1
    if (newIndex >= history.length) {
      setHistoryIndex(-1)
      return ''
    }
    setHistoryIndex(newIndex)
    return history[newIndex]
  }, [history, historyIndex])

  const resetHistoryIndex = useCallback(() => {
    setHistoryIndex(-1)
  }, [])

  return {
    outputs,
    history,
    addOutput,
    clearOutputs,
    addToHistory,
    getPreviousCommand,
    getNextCommand,
    resetHistoryIndex,
  }
}
