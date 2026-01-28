import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyToClipboard, EMAIL, downloadResume } from './clipboard'

describe('clipboard utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('copyToClipboard', () => {
    it('should copy text using clipboard API', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText },
      })

      const result = await copyToClipboard('test text')

      expect(mockWriteText).toHaveBeenCalledWith('test text')
      expect(result).toBe(true)
    })

    it('should return false if clipboard API fails', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('Failed'))
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText },
      })

      // Mock execCommand to also fail
      document.execCommand = vi.fn().mockImplementation(() => {
        throw new Error('Not supported')
      })

      const result = await copyToClipboard('test text')

      expect(result).toBe(false)
    })
  })

  describe('EMAIL constant', () => {
    it('should be the correct email', () => {
      expect(EMAIL).toBe('rupayan.roy16@gmail.com')
    })
  })

  describe('downloadResume', () => {
    it('should create and click a download link', () => {
      const mockClick = vi.fn()
      const mockCreateElement = vi.spyOn(document, 'createElement')
      mockCreateElement.mockReturnValue({
        href: '',
        download: '',
        click: mockClick,
      } as unknown as HTMLAnchorElement)

      downloadResume()

      expect(mockCreateElement).toHaveBeenCalledWith('a')
      expect(mockClick).toHaveBeenCalled()

      mockCreateElement.mockRestore()
    })
  })
})
