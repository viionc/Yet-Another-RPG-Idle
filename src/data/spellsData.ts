import { PlayerStatIds } from '../consts/enums/ids/player-stat-ids'
import { SpellIds } from '../consts/enums/ids/spell-ids.enum'
import { SpellType } from '../consts/enums/spell-type.enum'

export type SpellProps = {
  name: string
  baseManaCost: number
  baseCooldown: number
  url: string
  effect: SpellEffectProps
  description: string
}

export type SpellEffectProps = SpellMeleeEffectProps | SpellMagicEffectProps | SpellSupportStatBuffEffectProps

export type SpellMeleeEffectProps = {
  type: SpellType.meleeDamage
}

export type SpellMagicEffectProps = {
  type: SpellType.magicDamage
  baseDamage: number
}

export type SpellSupportStatBuffEffectProps = {
  type: SpellType.supportBuff
  duration: number
  id: PlayerStatIds
  value: number
}

const SPELLS_DATA: Record<SpellIds, SpellProps> = {
  [SpellIds.fireStrike]: {
    name: 'Fire Strike',
    baseManaCost: 2,
    baseCooldown: 60,
    description: 'Weak Fire Spell that deals 15 base damage.',
    url: './skills/fireStrike.png',
    effect: {
      type: SpellType.magicDamage,
      baseDamage: 15,
    },
  },
  [SpellIds.haste]: {
    name: 'Haste',
    baseManaCost: 5,
    baseCooldown: 300,
    description: 'Increases attack speed by 0.3 for 1 minute.',
    url: './skills/haste.png',
    effect: {
      type: SpellType.supportBuff,
      duration: 60,
      id: PlayerStatIds.attackSpeed,
      value: 0.3,
    },
  },
  [SpellIds.doubleAttack]: {
    name: 'Double Attack',
    baseManaCost: 2,
    baseCooldown: 60,
    description: 'Quick double attack.',
    url: './skills/doubleAttack.png',
    effect: {
      type: SpellType.meleeDamage,
    },
  },
}

export default SPELLS_DATA
