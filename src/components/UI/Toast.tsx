import { motion } from 'framer-motion'
import { Check, Info, AlertCircle, X } from 'lucide-react'
import type { Toast as ToastType } from '../../types'

interface ToastProps {
  toast: ToastType
  onClose: () => void
}

const icons = {
  success: Check,
  info: Info,
  error: AlertCircle,
}

const colors = {
  success: 'border-green-500',
  info: 'border-[var(--accent)]',
  error: 'border-red-500',
}

export function Toast({ toast, onClose }: ToastProps) {
  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] border-l-2 ${colors[toast.type]} rounded shadow-lg`}
    >
      <Icon size={16} className="text-[var(--accent)] flex-shrink-0" />
      <span className="text-[var(--text)] text-sm">{toast.message}</span>
      <button
        onClick={onClose}
        className="text-[var(--text-dim)] hover:text-[var(--text)] ml-2"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}
