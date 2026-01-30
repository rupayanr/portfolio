import { BentoCard } from './BentoCard'
import { AmbientPlayer } from '../UI/AmbientPlayer'

export function AmbientCard() {
  return (
    <BentoCard command="play ambient.ogg" className="flex items-center justify-center">
      <AmbientPlayer />
    </BentoCard>
  )
}
