import {
  Code2,
  Database,
  Cloud,
  GitBranch,
  Container,
  Cpu,
  Globe,
  Server,
  Zap,
} from 'lucide-react'

export const skills = [
  { name: 'Python', icon: Code2 },
  { name: 'FastAPI', icon: Zap },
  { name: 'React', icon: Code2 },
  { name: 'TypeScript', icon: Code2 },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Redis', icon: Database },
  { name: 'Docker', icon: Container },
  { name: 'AWS', icon: Cloud },
  { name: 'Azure', icon: Cloud },
  { name: 'Git', icon: GitBranch },
  { name: 'REST APIs', icon: Globe },
  { name: 'Microservices', icon: Server },
  { name: 'WebRTC', icon: Cpu },
]

// Simple list for terminal command output
export const skillNames = skills.map(s => s.name)
