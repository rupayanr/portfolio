import { Github, Linkedin, Mail, FileDown } from 'lucide-react'

export const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/rupayanr',
    icon: Github,
    action: 'link' as const,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/rupayan-roy',
    icon: Linkedin,
    action: 'link' as const,
  },
  {
    name: 'Email',
    url: 'rupayan.roy16@gmail.com',
    icon: Mail,
    action: 'copy' as const,
  },
  {
    name: 'Resume',
    url: '/resume.pdf',
    icon: FileDown,
    action: 'download' as const,
  },
]
