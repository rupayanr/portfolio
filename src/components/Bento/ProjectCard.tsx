import { ArrowRight, ExternalLink } from 'lucide-react'
import { BentoCard } from './BentoCard'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <BentoCard className="h-full min-h-[180px] project-card-glow">
      <div className="flex flex-col h-full">
        <h3 className="text-[var(--accent)] font-medium">{project.name}/</h3>
        <p className="text-[var(--text)] text-sm mt-2">{project.description}</p>

        <div className="flex flex-wrap gap-1 mt-3">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-1.5 py-0.5 bg-[var(--bg)] text-[var(--text-dim)] rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          {project.status === 'live' ? (
            <a
              href={project.url || project.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
            >
              {project.npm ? 'npm' : 'View'} <ArrowRight size={14} />
            </a>
          ) : (
            <span className="text-[var(--text-dim)] text-sm">Coming Soon</span>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[var(--text-dim)] hover:text-[var(--accent)] ml-4"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  )
}
