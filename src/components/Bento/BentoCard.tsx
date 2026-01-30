import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BentoCardProps {
  command?: string
  children: ReactNode
  className?: string
  id?: string
}

export function BentoCard({ command, children, className = '', id }: BentoCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)] hover:-translate-y-1 transition-all duration-200 ${className}`}
    >
      {command && (
        <div className="text-[var(--text-dim)] text-sm mb-3">$ {command}</div>
      )}
      {children}
    </motion.div>
  )
}
