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
    url: 'https://resumeroaster.rupayan.dev',
    github: 'https://github.com/rupayanr/resume-roaster',
    status: 'coming-soon',
  },
  {
    name: 'cribinfo',
    description: 'Housing search powered by RAG',
    tech: ['React', 'FastAPI', 'pgvector', 'Leaflet'],
    url: 'https://cribinfo.rupayan.dev',
    github: 'https://github.com/rupayanr/cribinfo',
    status: 'coming-soon',
  },
  {
    name: 'gitwho',
    description: 'CLI tool for git contributor stats',
    tech: ['TypeScript', 'Node.js', 'Commander'],
    npm: 'https://npmjs.com/package/gitwho',
    github: 'https://github.com/rupayanr/gitwho',
    status: 'coming-soon',
  },
]
