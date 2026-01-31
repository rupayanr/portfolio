import { AnimatePresence } from 'framer-motion'
import { Toast } from './Toast'
import type { Toast as ToastType } from '../../types'

interface ToastContainerProps {
  toasts: ToastType[]
  removeToast: (id: string) => void
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 md:right-6 left-6 md:left-auto z-50 flex flex-col gap-2 items-center md:items-end">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
