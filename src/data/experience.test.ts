import { describe, it, expect } from 'vitest'
import { experiences } from './experience'

describe('Experience Data', () => {
  it('should have 3 experience entries', () => {
    expect(experiences).toHaveLength(3)
  })

  it('should have MathCo as the most recent experience', () => {
    expect(experiences[0].company).toBe('MathCo')
    expect(experiences[0].role).toBe('Senior Product Engineer')
  })

  it('should have Infineon as the second experience', () => {
    expect(experiences[1].company).toBe('Infineon Technologies')
    expect(experiences[1].role).toBe('Developer II')
  })

  it('should have Infosys as the earliest experience', () => {
    expect(experiences[2].company).toBe('Infosys')
    expect(experiences[2].role).toBe('Senior Systems Engineer')
  })

  it('each experience should have required fields', () => {
    experiences.forEach(exp => {
      expect(exp).toHaveProperty('company')
      expect(exp).toHaveProperty('role')
      expect(exp).toHaveProperty('period')
      expect(exp).toHaveProperty('highlights')
      expect(Array.isArray(exp.highlights)).toBe(true)
      expect(exp.highlights.length).toBeGreaterThan(0)
    })
  })

  it('MathCo should have highlights about streaming and team leadership', () => {
    const mathco = experiences[0]
    const highlightTexts = mathco.highlights.join(' ').toLowerCase()
    expect(highlightTexts).toContain('streaming')
    expect(highlightTexts).toContain('team')
  })
})
