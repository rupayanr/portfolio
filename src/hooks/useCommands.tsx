import { useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { themes } from '../themes'
import { skillNames } from '../data/skills'
import { commandList } from '../data/commands'
import type { CommandOutput } from '../types'

interface UseCommandsProps {
  addOutput: (output: CommandOutput) => void
  clearOutputs: () => void
  addToast: (message: string, type: 'success' | 'info' | 'error') => void
}

export function useCommands({ addOutput, clearOutputs, addToast }: UseCommandsProps) {
  const { theme, setTheme } = useTheme()

  const generateId = () => Math.random().toString(36).substring(2, 9)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase()
    const [cmd, ...args] = trimmed.split(' ')

    // Easter eggs
    if (trimmed === 'sudo rm -rf /') {
      addOutput({
        id: generateId(),
        command: input,
        output: 'Nice try 😏',
        type: 'error',
      })
      return
    }

    if (trimmed === 'matrix') {
      setTheme('matrix')
      addOutput({
        id: generateId(),
        command: input,
        output: '✓ Welcome to the Matrix',
        type: 'success',
      })
      addToast('Theme: Matrix', 'success')
      return
    }

    if (trimmed === 'hire' || trimmed === 'hire me') {
      addOutput({
        id: generateId(),
        command: input,
        output: (
          <div>
            <p>Great choice! 🎉</p>
            <p className="text-[var(--text-dim)] mt-1">
              Email me at <span className="text-[var(--accent)]">rupayan.roy16@gmail.com</span>
            </p>
          </div>
        ),
        type: 'success',
      })
      return
    }

    // Neofetch easter egg
    if (trimmed === 'neofetch') {
      addOutput({
        id: generateId(),
        command: input,
        output: (
          <pre className="text-xs">
{`       ___          rupayan@portfolio
      (.. |         ──────────────────
      (<> |         OS: macOS Developer Edition
     / __  \\        Host: rupayan.dev
    ( /  \\ /|       Kernel: React 18 + TypeScript
   _/\\ __)/_)       Uptime: 6 years in tech
   \\/-____\\/        Shell: zsh + starship
                    Terminal: iTerm2
   @rupayanr         Editor: VS Code + Vim motions
                    Theme: ${theme.name}
                    Coffee: mass_consumed`}
          </pre>
        ),
        type: 'info',
      })
      return
    }

    // Cat readme easter egg
    if (trimmed === 'cat readme' || trimmed === 'cat readme.md') {
      addOutput({
        id: generateId(),
        command: input,
        output: (
          <div className="space-y-2">
            <p className="text-[var(--accent)] font-bold"># Hey there! 👋</p>
            <p>I'm Rupayan, a Senior Software Engineer who loves building things.</p>
            <p className="text-[var(--text-dim)]">
              I specialize in full-stack development with Python, FastAPI, React, and TypeScript.
            </p>
            <p className="text-[var(--text-dim)]">
              When I'm not coding, you'll find me exploring new tech or brewing coffee.
            </p>
            <p className="mt-2">
              <span className="text-[var(--accent)]">→</span> Type <span className="text-[var(--accent)]">help</span> to see what I can do
            </p>
          </div>
        ),
        type: 'info',
      })
      return
    }

    // Whoami verbose
    if (trimmed === 'whoami --verbose' || trimmed === 'whoami -v') {
      addOutput({
        id: generateId(),
        command: input,
        output: (
          <div className="space-y-1">
            <p><span className="text-[var(--accent)]">name:</span> Rupayan Roy</p>
            <p><span className="text-[var(--accent)]">role:</span> Senior Software Engineer</p>
            <p><span className="text-[var(--accent)]">location:</span> Bangalore, India</p>
            <p><span className="text-[var(--accent)]">experience:</span> 6+ years</p>
            <p><span className="text-[var(--accent)]">focus:</span> Full Stack, Distributed Systems</p>
            <p><span className="text-[var(--accent)]">status:</span> <span className="text-green-400">Available for hire</span></p>
            <p><span className="text-[var(--accent)]">email:</span> rupayan.roy16@gmail.com</p>
            <p><span className="text-[var(--accent)]">coffee:</span> mass_consumed</p>
          </div>
        ),
        type: 'info',
      })
      return
    }

    // Exit command
    if (trimmed === 'exit' || trimmed === 'quit') {
      addOutput({
        id: generateId(),
        command: input,
        output: "Nice try! But you can't escape this easily 😄",
        type: 'info',
      })
      return
    }

    // Cowsay easter egg
    if (cmd === 'cowsay') {
      const message = args.join(' ') || 'Moo!'
      addOutput({
        id: generateId(),
        command: input,
        output: (
          <pre className="text-xs">
{` ${'_'.repeat(message.length + 2)}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
          </pre>
        ),
        type: 'info',
      })
      return
    }

    switch (cmd) {
      case 'help':
        addOutput({
          id: generateId(),
          command: input,
          output: (
            <div className="space-y-1">
              {commandList.map(c => (
                <div key={c.cmd} className="flex gap-4">
                  <span className="text-[var(--accent)] w-24">{c.cmd}</span>
                  <span className="text-[var(--text-dim)]">{c.description}</span>
                </div>
              ))}
              <p className="text-[var(--text-dim)] mt-2 text-xs">
                Psst... try neofetch, cowsay, or whoami --verbose 🤫
              </p>
            </div>
          ),
          type: 'info',
        })
        break

      case 'whoami':
        scrollToSection('hero')
        addOutput({
          id: generateId(),
          command: input,
          output: '↑ Scrolling to hero...',
          type: 'info',
        })
        break

      case 'projects':
        scrollToSection('projects')
        addOutput({
          id: generateId(),
          command: input,
          output: '↑ Scrolling to projects...',
          type: 'info',
        })
        break

      case 'skills':
        addOutput({
          id: generateId(),
          command: input,
          output: (
            <div className="flex flex-wrap gap-2">
              {skillNames.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-[var(--bg)] border border-[var(--border)] rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ),
          type: 'info',
        })
        break

      case 'theme':
        if (args.length === 0) {
          addOutput({
            id: generateId(),
            command: input,
            output: (
              <div className="space-y-1">
                <p className="text-[var(--text-dim)]">Available themes:</p>
                {themes.map(t => (
                  <div key={t.id} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: t.colors.accent }}
                    />
                    <span className={t.id === theme.id ? 'text-[var(--accent)]' : ''}>
                      {t.id} {t.id === theme.id && '(current)'}
                    </span>
                  </div>
                ))}
                <p className="text-[var(--text-dim)] mt-2">Usage: theme {'<id>'}</p>
              </div>
            ),
            type: 'info',
          })
        } else {
          const themeId = args[0]
          const found = themes.find(t => t.id === themeId)
          if (found) {
            setTheme(themeId)
            addOutput({
              id: generateId(),
              command: input,
              output: `✓ Theme: ${found.name}`,
              type: 'success',
            })
            addToast(`Theme: ${found.name}`, 'success')
          } else {
            addOutput({
              id: generateId(),
              command: input,
              output: `Unknown theme: ${themeId}`,
              type: 'error',
            })
          }
        }
        break

      case 'github':
        window.open('https://github.com/rupayanr', '_blank')
        addOutput({
          id: generateId(),
          command: input,
          output: '↗ Opening GitHub...',
          type: 'info',
        })
        break

      case 'linkedin':
        window.open('https://linkedin.com/in/rupayan-roy', '_blank')
        addOutput({
          id: generateId(),
          command: input,
          output: '↗ Opening LinkedIn...',
          type: 'info',
        })
        break

      case 'email':
        navigator.clipboard.writeText('rupayan.roy16@gmail.com')
        addOutput({
          id: generateId(),
          command: input,
          output: '✓ Copied rupayan.roy16@gmail.com',
          type: 'success',
        })
        addToast('Email copied!', 'success')
        break

      case 'resume':
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'rupayan-roy-resume.pdf'
        link.click()
        addOutput({
          id: generateId(),
          command: input,
          output: '⬇ Downloading resume...',
          type: 'info',
        })
        addToast('Downloading resume...', 'info')
        break

      case 'source':
        window.open('https://github.com/rupayanr/portfolio', '_blank')
        addOutput({
          id: generateId(),
          command: input,
          output: '↗ Opening portfolio source...',
          type: 'info',
        })
        break

      case 'clear':
        clearOutputs()
        break

      default:
        addOutput({
          id: generateId(),
          command: input,
          output: `Command not found: ${cmd}. Type 'help' for available commands.`,
          type: 'error',
        })
    }
  }, [addOutput, clearOutputs, addToast, setTheme, theme.id, theme.name])

  return { executeCommand }
}
