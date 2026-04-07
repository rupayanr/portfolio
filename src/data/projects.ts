import type { Project } from '../types'

export const projects: Project[] = [
  {
    name: 'livedoc',
    description: 'Real-time collaborative markdown editor',
    tech: ['React', 'FastAPI', 'WebSockets', 'Y.js'],
    url: 'https://livedoc.rupayan.dev',
    github: 'https://github.com/rupayanr/livedoc',
    status: 'coming-soon',
  },
  {
    name: 'resume-roaster',
    description: 'Upload your resume, get brutally honest AI feedback',
    tech: ['React', 'FastAPI', 'Ollama', 'PDF'],
    url: 'https://resume-roaster-app.vercel.app',
    github: 'https://github.com/rupayanr/resume-roaster',
    status: 'live',
  },
  {
    name: 'cribinfo',
    description: 'Housing search powered by RAG',
    tech: ['React', 'FastAPI', 'pgvector', 'Leaflet'],
    url: 'https://cribinfo.vercel.app',
    github: 'https://github.com/rupayanr/cribinfo',
    status: 'live',
  },
]
