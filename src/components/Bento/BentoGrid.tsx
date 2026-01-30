import { motion } from 'framer-motion'
import { HeroCard } from './HeroCard'
import { SkillsCard } from './SkillsCard'
import { ProjectCard } from './ProjectCard'
import { ContactCard } from './ContactCard'
import { projects } from '../../data/projects'

interface BentoGridProps {
  addToast: (message: string, type: 'success' | 'info' | 'error') => void
}

export function BentoGrid({ addToast }: BentoGridProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-32 md:pb-48">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hero - spans 2 columns */}
        <HeroCard />

        {/* Skills */}
        <SkillsCard />

        {/* Projects header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:col-span-full text-[var(--text-dim)] text-sm mt-4"
          id="projects"
        >
          $ ls projects/
        </motion.div>

        {/* Project cards */}
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}

        {/* Contact */}
        <ContactCard addToast={addToast} />
      </div>
    </div>
  )
}
