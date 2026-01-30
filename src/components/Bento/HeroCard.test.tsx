import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroCard } from './HeroCard'
import { AvailabilityProvider } from '../../context/AvailabilityContext'

// Mock the ASCII art imports
vi.mock('../../assets/ascii', () => ({
  ASCII_FULL_NAME: 'MOCK_FULL_NAME',
  ASCII_INITIALS: 'MOCK_INITIALS',
}))

function renderHeroCard() {
  return render(
    <AvailabilityProvider>
      <HeroCard />
    </AvailabilityProvider>
  )
}

describe('HeroCard', () => {
  it('renders the card with whoami command', () => {
    renderHeroCard()
    expect(screen.getByText('$ whoami')).toBeInTheDocument()
  })

  it('displays Rupayan Roy name', () => {
    renderHeroCard()
    expect(screen.getAllByText('Rupayan Roy').length).toBeGreaterThan(0)
  })

  it('displays Senior Software Engineer title', () => {
    renderHeroCard()
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
  })

  it('displays availability badge with default available status', () => {
    renderHeroCard()
    expect(screen.getAllByText('Available for hire').length).toBeGreaterThan(0)
  })

  it('renders social links', () => {
    renderHeroCard()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Copy email')).toBeInTheDocument()
  })

  it('renders ASCII art elements', () => {
    renderHeroCard()
    expect(screen.getByText('MOCK_FULL_NAME')).toBeInTheDocument()
    expect(screen.getByText('MOCK_INITIALS')).toBeInTheDocument()
  })

  it('has correct link hrefs', () => {
    renderHeroCard()
    const githubLink = screen.getByLabelText('GitHub')
    const linkedinLink = screen.getByLabelText('LinkedIn')
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rupayanr')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/rupayan-roy')
  })

  it('availability badge has pulsing dot', () => {
    renderHeroCard()
    // Find elements with animate-pulse class
    const badges = document.querySelectorAll('.animate-pulse')
    expect(badges.length).toBeGreaterThan(0)
  })
})

describe('HeroCard with different availability statuses', () => {
  it('shows busy status when localStorage has busy', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('busy')
    
    renderHeroCard()
    expect(screen.getAllByText('Currently busy').length).toBeGreaterThan(0)
  })

  it('shows away status when localStorage has away', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('away')
    
    renderHeroCard()
    expect(screen.getAllByText('Away').length).toBeGreaterThan(0)
  })
})
