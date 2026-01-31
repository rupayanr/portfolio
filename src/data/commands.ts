import {
  HelpCircle,
  FolderGit2,
  Code,
  Palette,
  Github,
  Linkedin,
  Mail,
  FileDown,
} from 'lucide-react'

export const commandChips = [
  { cmd: 'help', icon: HelpCircle, label: 'help' },
  { cmd: 'projects', icon: FolderGit2, label: 'projects' },
  { cmd: 'skills', icon: Code, label: 'skills' },
  { cmd: 'theme', icon: Palette, label: 'theme' },
  { cmd: 'github', icon: Github, label: 'github' },
  { cmd: 'linkedin', icon: Linkedin, label: 'linkedin' },
  { cmd: 'email', icon: Mail, label: 'email' },
  { cmd: 'resume', icon: FileDown, label: 'resume' },
]

export const commandList = [
  { cmd: 'help', description: 'Show all commands' },
  { cmd: 'whoami', description: 'Scroll to hero' },
  { cmd: 'projects', description: 'Scroll to projects' },
  { cmd: 'skills', description: 'Show tech stack' },
  { cmd: 'theme', description: 'List themes' },
  { cmd: 'theme <id>', description: 'Switch theme' },
  { cmd: 'github', description: 'Open GitHub' },
  { cmd: 'linkedin', description: 'Open LinkedIn' },
  { cmd: 'email', description: 'Copy email' },
  { cmd: 'resume', description: 'Download resume' },
  { cmd: 'source', description: 'Open portfolio repo' },
  { cmd: 'clear', description: 'Clear output' },
]
