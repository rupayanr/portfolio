import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AvailabilityProvider, useAvailability } from './AvailabilityContext'

// Test component to access context
function TestComponent() {
  const { status, setStatus, statusLabel, statusColor } = useAvailability()
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="label">{statusLabel}</span>
      <span data-testid="color">{statusColor}</span>
      <button onClick={() => setStatus('busy')}>Set Busy</button>
      <button onClick={() => setStatus('away')}>Set Away</button>
      <button onClick={() => setStatus('available')}>Set Available</button>
    </div>
  )
}

describe('AvailabilityContext', () => {
  it('provides default available status', () => {
    render(
      <AvailabilityProvider>
        <TestComponent />
      </AvailabilityProvider>
    )

    expect(screen.getByTestId('status')).toHaveTextContent('available')
    expect(screen.getByTestId('label')).toHaveTextContent('Available for hire')
    expect(screen.getByTestId('color')).toHaveTextContent('text-green-400')
  })

  it('can change status to busy', () => {
    render(
      <AvailabilityProvider>
        <TestComponent />
      </AvailabilityProvider>
    )

    act(() => {
      screen.getByText('Set Busy').click()
    })

    expect(screen.getByTestId('status')).toHaveTextContent('busy')
    expect(screen.getByTestId('label')).toHaveTextContent('Currently busy')
    expect(screen.getByTestId('color')).toHaveTextContent('text-yellow-400')
  })

  it('can change status to away', () => {
    render(
      <AvailabilityProvider>
        <TestComponent />
      </AvailabilityProvider>
    )

    act(() => {
      screen.getByText('Set Away').click()
    })

    expect(screen.getByTestId('status')).toHaveTextContent('away')
    expect(screen.getByTestId('label')).toHaveTextContent('Away')
    expect(screen.getByTestId('color')).toHaveTextContent('text-red-400')
  })

  it('persists status to localStorage', () => {
    render(
      <AvailabilityProvider>
        <TestComponent />
      </AvailabilityProvider>
    )

    act(() => {
      screen.getByText('Set Busy').click()
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('availability', 'busy')
  })

  it('loads status from localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('away')

    render(
      <AvailabilityProvider>
        <TestComponent />
      </AvailabilityProvider>
    )

    expect(screen.getByTestId('status')).toHaveTextContent('away')
  })

  it('throws error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => render(<TestComponent />)).toThrow(
      'useAvailability must be used within an AvailabilityProvider'
    )
    
    consoleError.mockRestore()
  })
})
