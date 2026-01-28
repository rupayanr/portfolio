export const EMAIL = 'rupayan.roy16@gmail.com'

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers or restricted contexts
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch {
      return false
    }
  }
}

export function downloadResume(): void {
  const link = document.createElement('a')
  link.href = '/resume.pdf'
  link.download = 'rupayan-roy-resume.pdf'
  link.click()
}
