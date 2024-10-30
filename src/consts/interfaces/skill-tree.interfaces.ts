import { PlayerStatIds } from '../enums/ids/player-stat-ids'
import { SkillIds } from '../enums/ids/skill-ids.enum'
import { SkillTreeIds } from '../enums/ids/skill-tree-ids.enum'
import { SpellIds } from '../enums/ids/spell-ids.enum'
import { SkillPointType } from '../enums/skill-point-type.enum'

export type SkillTreeNames = 'Damage' | 'Exploration' | 'Magic'

export interface SkillProps {
  id: SkillIds
  name: string
  skillPointCost: number
  unlockRequirements: null
  row: number
  col: number
  special?: boolean
  maxLevel: number
  url: string
  description: string
}

export interface StatSkillPoint extends SkillProps {
  type: SkillPointType.stat
  stat: PlayerStatIds
  value: number
}

export interface SpellSkillPoint extends SkillProps {
  type: SkillPointType.spell
  spellId: SpellIds
}

export interface OtherSkillPoint extends SkillProps {
  type: SkillPointType.battle
}

export type SkillPoints = StatSkillPoint | SpellSkillPoint | OtherSkillPoint

export type StatEffectProps = {
  id: PlayerStatIds
  value: number
}
export type SkillTreeProps = {
  id: SkillTreeIds
  name: string
  skills: SkillProps[]
  unlockedRequirement: null
  bgColor: string
}
