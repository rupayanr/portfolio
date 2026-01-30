import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Audio - use a function to avoid infinite recursion
function createMockAudio() {
  return {
    src: '',
    volume: 1,
    loop: false,
    paused: true,
    playbackRate: 1,
    preload: 'auto',
    readyState: 4, // HAVE_ENOUGH_DATA - audio is ready
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    load: vi.fn(),
    cloneNode: vi.fn().mockImplementation(() => createMockAudio()),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
}

window.Audio = vi.fn().mockImplementation(() => createMockAudio()) as unknown as typeof Audio

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
  localStorageMock.getItem.mockReturnValue(null)
})

export { localStorageMock }
