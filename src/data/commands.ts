import {
  HelpCircle,
  FolderGit2,
  Code,
  Palette,
  Github,
  FileDown,
  Briefcase,
  Volume2,
} from 'lucide-react'

export const commandChips = [
  { cmd: 'help', icon: HelpCircle, label: 'help' },
  { cmd: 'projects', icon: FolderGit2, label: 'projects' },
  { cmd: 'skills', icon: Code, label: 'skills' },
  { cmd: 'experience', icon: Briefcase, label: 'exp' },
  { cmd: 'theme', icon: Palette, label: 'theme' },
  { cmd: 'sound', icon: Volume2, label: 'sound' },
  { cmd: 'github', icon: Github, label: 'github' },
  { cmd: 'resume', icon: FileDown, label: 'resume' },
]

export const commandList = [
  { cmd: 'help', description: 'Show all commands' },
  { cmd: 'whoami', description: 'Scroll to hero' },
  { cmd: 'projects', description: 'Scroll to projects' },
  { cmd: 'skills', description: 'Show tech stack' },
  { cmd: 'experience', description: 'Show work history' },
  { cmd: 'cat about.txt', description: 'Read my bio' },
  { cmd: 'status', description: 'Show availability' },
  { cmd: 'status <type>', description: 'Set availability (available|busy|away)' },
  { cmd: 'sound', description: 'Show sound status' },
  { cmd: 'sound <on|off>', description: 'Toggle sounds' },
  { cmd: 'theme', description: 'List themes' },
  { cmd: 'theme <id>', description: 'Switch theme' },
  { cmd: 'github', description: 'Open GitHub' },
  { cmd: 'linkedin', description: 'Open LinkedIn' },
  { cmd: 'email', description: 'Copy email' },
  { cmd: 'resume', description: 'Download resume' },
  { cmd: 'source', description: 'Open portfolio repo' },
  { cmd: 'clear', description: 'Clear output' },
]
