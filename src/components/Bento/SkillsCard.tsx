import { BentoCard } from './BentoCard'
import { skills } from '../../data/skills'

export function SkillsCard() {
  return (
    <BentoCard command="cat skills.txt" id="skills">
      <div className="flex flex-wrap gap-2">
        {skills.map(({ name, icon: Icon }) => (
          <span
            key={name}
            className="flex items-center gap-1.5 px-2 py-1 bg-[var(--bg)] border border-[var(--border)] rounded text-sm text-[var(--text)]"
          >
            <Icon size={14} className="text-[var(--accent)]" />
            {name}
          </span>
        ))}
      </div>
    </BentoCard>
  )
}
