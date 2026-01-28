export interface Project {
  name: string
  description: string
  tech: string[]
  url?: string
  github?: string
  npm?: string
  status: 'live' | 'coming-soon'
}

export interface CommandOutput {
  id: string
  command: string
  output: React.ReactNode
  type: 'success' | 'info' | 'error'
}

export type ToastType = 'success' | 'info' | 'error'

export interface Toast {
  id: string
  type: ToastType
  message: string
}
