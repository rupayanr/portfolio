import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TerminalInput } from './TerminalInput'
import { SoundProvider } from '../../context/SoundContext'

const mockProps = {
  onSubmit: vi.fn(),
  onHistoryUp: vi.fn().mockReturnValue(null),
  onHistoryDown: vi.fn().mockReturnValue(null),
  onResetHistory: vi.fn(),
}

function renderTerminalInput(props = mockProps) {
  return render(
    <SoundProvider>
      <TerminalInput {...props} />
    </SoundProvider>
  )
}

describe('TerminalInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input field with placeholder', () => {
    renderTerminalInput()
    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument()
  })

  it('renders $ prompt', () => {
    renderTerminalInput()
    expect(screen.getByText('$')).toBeInTheDocument()
  })

  it('renders blinking cursor', () => {
    renderTerminalInput()
    expect(screen.getByText('_')).toBeInTheDocument()
  })

  it('calls onSubmit when Enter is pressed with input', async () => {
    const onSubmit = vi.fn()
    renderTerminalInput({ ...mockProps, onSubmit })

    const input = screen.getByPlaceholderText('Type a command...')
    await userEvent.type(input, 'help')
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSubmit).toHaveBeenCalledWith('help')
  })

  it('does not call onSubmit when Enter is pressed with empty input', () => {
    const onSubmit = vi.fn()
    renderTerminalInput({ ...mockProps, onSubmit })

    const input = screen.getByPlaceholderText('Type a command...')
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('clears input after submit', async () => {
    renderTerminalInput()

    const input = screen.getByPlaceholderText('Type a command...') as HTMLInputElement
    await userEvent.type(input, 'help')
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(input.value).toBe('')
  })

  it('calls onHistoryUp when ArrowUp is pressed', () => {
    const onHistoryUp = vi.fn().mockReturnValue('previous-command')
    renderTerminalInput({ ...mockProps, onHistoryUp })

    const input = screen.getByPlaceholderText('Type a command...')
    fireEvent.keyDown(input, { key: 'ArrowUp' })

    expect(onHistoryUp).toHaveBeenCalled()
  })

  it('calls onHistoryDown when ArrowDown is pressed', () => {
    const onHistoryDown = vi.fn().mockReturnValue('next-command')
    renderTerminalInput({ ...mockProps, onHistoryDown })

    const input = screen.getByPlaceholderText('Type a command...')
    fireEvent.keyDown(input, { key: 'ArrowDown' })

    expect(onHistoryDown).toHaveBeenCalled()
  })

  it('sets input value from history navigation', () => {
    const onHistoryUp = vi.fn().mockReturnValue('previous-command')
    renderTerminalInput({ ...mockProps, onHistoryUp })

    const input = screen.getByPlaceholderText('Type a command...') as HTMLInputElement
    fireEvent.keyDown(input, { key: 'ArrowUp' })

    expect(input.value).toBe('previous-command')
  })

  it('calls onResetHistory after submit', async () => {
    const onResetHistory = vi.fn()
    renderTerminalInput({ ...mockProps, onResetHistory })

    const input = screen.getByPlaceholderText('Type a command...')
    await userEvent.type(input, 'help')
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onResetHistory).toHaveBeenCalled()
  })

  it('input has correct accessibility attributes', () => {
    renderTerminalInput()

    const input = screen.getByPlaceholderText('Type a command...')
    expect(input).toHaveAttribute('autoCapitalize', 'none')
    expect(input).toHaveAttribute('autoCorrect', 'off')
    expect(input).toHaveAttribute('spellcheck', 'false')
  })
})
