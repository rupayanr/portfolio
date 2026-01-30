import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type AvailabilityStatus = 'available' | 'busy' | 'away'

interface AvailabilityContextType {
  status: AvailabilityStatus
  setStatus: (status: AvailabilityStatus) => void
  statusLabel: string
  statusColor: string
}

const statusConfig: Record<AvailabilityStatus, { label: string; color: string }> = {
  available: { label: 'Available for hire', color: 'text-green-400' },
  busy: { label: 'Currently busy', color: 'text-yellow-400' },
  away: { label: 'Away', color: 'text-red-400' },
}

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(undefined)

export function AvailabilityProvider({ children }: { children: ReactNode }) {
  const [status, setStatusState] = useState<AvailabilityStatus>(() => {
    const saved = localStorage.getItem('availability')
    if (saved && (saved === 'available' || saved === 'busy' || saved === 'away')) {
      return saved
    }
    return 'available'
  })

  useEffect(() => {
    localStorage.setItem('availability', status)
  }, [status])

  const setStatus = (newStatus: AvailabilityStatus) => {
    setStatusState(newStatus)
  }

  const { label: statusLabel, color: statusColor } = statusConfig[status]

  return (
    <AvailabilityContext.Provider value={{ status, setStatus, statusLabel, statusColor }}>
      {children}
    </AvailabilityContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAvailability() {
  const context = useContext(AvailabilityContext)
  if (context === undefined) {
    throw new Error('useAvailability must be used within an AvailabilityProvider')
  }
  return context
}
