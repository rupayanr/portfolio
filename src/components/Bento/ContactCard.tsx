import { Copy, Download } from 'lucide-react'
import { BentoCard } from './BentoCard'
import { copyToClipboard, downloadResume, EMAIL } from '../../utils/clipboard'

interface ContactCardProps {
  addToast: (message: string, type: 'success' | 'info' | 'error') => void
}

export function ContactCard({ addToast }: ContactCardProps) {
  const handleCopyEmail = async () => {
    const success = await copyToClipboard(EMAIL)
    addToast(success ? 'Email copied!' : 'Failed to copy email', success ? 'success' : 'error')
  }

  const handleDownloadResume = () => {
    downloadResume()
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
