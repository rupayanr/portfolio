import { describe, it, expect } from 'vitest'
import { commandChips, commandList } from './commands'

describe('Command Chips', () => {
  it('has 8 command chips', () => {
    expect(commandChips).toHaveLength(8)
  })

  it('includes experience command chip', () => {
    const expChip = commandChips.find(c => c.cmd === 'experience')
    expect(expChip).toBeDefined()
    expect(expChip?.label).toBe('exp')
  })

  it('includes sound command chip', () => {
    const soundChip = commandChips.find(c => c.cmd === 'sound')
    expect(soundChip).toBeDefined()
    expect(soundChip?.label).toBe('sound')
  })

  it('all chips have required properties', () => {
    commandChips.forEach(chip => {
      expect(chip).toHaveProperty('cmd')
      expect(chip).toHaveProperty('icon')
      expect(chip).toHaveProperty('label')
      expect(typeof chip.cmd).toBe('string')
      expect(typeof chip.label).toBe('string')
    })
  })
})

describe('Command List', () => {
  it('includes experience command', () => {
    const expCmd = commandList.find(c => c.cmd === 'experience')
    expect(expCmd).toBeDefined()
    expect(expCmd?.description).toBe('Show work history')
  })

  it('includes cat about.txt command', () => {
    const aboutCmd = commandList.find(c => c.cmd === 'cat about.txt')
    expect(aboutCmd).toBeDefined()
    expect(aboutCmd?.description).toBe('Read my bio')
  })

  it('includes status command', () => {
    const statusCmd = commandList.find(c => c.cmd === 'status')
    expect(statusCmd).toBeDefined()
    expect(statusCmd?.description).toBe('Show availability')
  })

  it('includes status with argument command', () => {
    const statusArgCmd = commandList.find(c => c.cmd === 'status <type>')
    expect(statusArgCmd).toBeDefined()
    expect(statusArgCmd?.description).toContain('availability')
  })

  it('includes sound command', () => {
    const soundCmd = commandList.find(c => c.cmd === 'sound')
    expect(soundCmd).toBeDefined()
    expect(soundCmd?.description).toBe('Show sound status')
  })

  it('includes sound on/off command', () => {
    const soundArgCmd = commandList.find(c => c.cmd === 'sound <on|off>')
    expect(soundArgCmd).toBeDefined()
    expect(soundArgCmd?.description).toContain('Toggle')
  })

  it('all commands have required properties', () => {
    commandList.forEach(cmd => {
      expect(cmd).toHaveProperty('cmd')
      expect(cmd).toHaveProperty('description')
      expect(typeof cmd.cmd).toBe('string')
      expect(typeof cmd.description).toBe('string')
    })
  })

  it('has at least 15 commands', () => {
    expect(commandList.length).toBeGreaterThanOrEqual(15)
  })
})
