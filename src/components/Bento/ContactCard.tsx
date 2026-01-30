import { Copy, Download } from 'lucide-react'
import { BentoCard } from './BentoCard'

interface ContactCardProps {
  addToast: (message: string, type: 'success' | 'info' | 'error') => void
}

export function ContactCard({ addToast }: ContactCardProps) {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rupayan.roy16@gmail.com')
    addToast('Email copied!', 'success')
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'rupayan-roy-resume.pdf'
    link.click()
    addToast('Downloading resume...', 'info')
  }

  return (
    <BentoCard command="contact" className="md:col-span-full" id="contact">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-[var(--text)]">rupayan.roy16@gmail.com</span>

        <div className="flex gap-3">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-md hover:border-[var(--accent)] transition-colors text-sm"
          >
            <Copy size={14} />
            Copy Email
          </button>
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
          >
            <Download size={14} />
            Download CV
          </button>
        </div>
      </div>
    </BentoCard>
  )
}
