import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import ENEMIES_DATA, { EnemyProps } from '../data/enemiesData'
import SPELLS_DATA, { SpellMagicEffectProps } from '../data/spellsData'
import { gameState } from '../store'
import { BattleStateEnemyProps, updateEnemyHp } from '../store/battle-state'
import { ItemIds } from '../consts/enums/ids/item-ids.enum'
import { PlayerStatIds } from '../consts/enums/ids/player-stat-ids'
import { SkillIds } from '../consts/enums/ids/skill-ids.enum'
import { SpellIds } from '../consts/enums/ids/spell-ids.enum'
import { ZoneIds } from '../consts/enums/ids/zone-ids.enum'
import { InventoryItemType } from '../consts/interfaces/inventory-item.interfaces'
import { PlayerStatsProps } from '../store/player-stats'
import { DamageDoneProps, handleEndBattle } from '../tickHandler/battleInterval'
import { Element } from '../consts/enums/element.enum'
import ITEM_DATA from '../data/itemsData'

export const calculateEnemyDrops = (enemy: EnemyProps): InventoryItemType[] => {
  const itemsToUpdate: InventoryItemType[] = []
  for (const drop of enemy.drops) {
    const roll = Math.ceil(Math.random() * drop.chance)
    if (roll === drop.chance) {
      const amount = Math.floor(Math.random() * (drop.maxAmount - drop.minAmount + 1) + drop.minAmount)
      const { type } = ITEM_DATA[drop.id]
      itemsToUpdate.push({ id: drop.id, amount, type } as InventoryItemType)
    }
  }

  return itemsToUpdate
}

export type CalculateDamageProps = {
  enemyWeakness: Element
  arrowNameEquipped?: ItemIds
  isBow?: true
  isDoubleAttack?: true
}

export const weaknessesMap: Record<Element, PlayerStatIds> = {
  [Element.fire]: PlayerStatIds.extraFireDamage,
  [Element.air]: PlayerStatIds.extraFireDamage,
  [Element.dark]: PlayerStatIds.extraDarkDamage,
  [Element.light]: PlayerStatIds.extraLightDamage,
  [Element.physical]: PlayerStatIds.extraPhysicalDamage,
  [Element.earth]: PlayerStatIds.extraEarthDamage,
  [Element.water]: PlayerStatIds.extraWaterDamage,
}

export const calculateDamageDone = ({ isDoubleAttack, enemyWeakness }: CalculateDamageProps): DamageDoneProps => {
  const { playerStats, playerSkills } = gameState.getState()
  const { attackPower } = playerStats

  let damage = attackPower

  // for double attack spell
  isDoubleAttack ? (damage *= 2) : null
  const elementKey = weaknessesMap[enemyWeakness]
  const extraElementalDamage = playerStats[elementKey]
  if (playerSkills[SkillIds.weaknesses]) {
    damage *= extraElementalDamage
  }
  const crit = calculateCritDamage(damage)

  return crit
}

export const calculateXpGain = (
  playerStats: PlayerStatsProps,
  zoneId: ZoneIds,
  currentWave: number,
  enemyExperience: number,
) => {
  const xp = Math.floor((enemyExperience + zoneId + 1) * currentWave + Math.pow(zoneId, 3))
  const xpMulti = playerStats.xpMultiplier
  return Math.ceil(xp * xpMulti)
}

export const calculateGoldGain = (playerStats: PlayerStatsProps, zoneId: ZoneIds, currentWave: number) => {
  const gold = Math.floor(Math.pow(zoneId, 2) + currentWave)
  const goldMulti = playerStats.goldCoinsMultiplier
  return Math.ceil(gold * goldMulti)
}

export const spellHit = (id: SpellIds, enemyWeakness: Element): DamageDoneProps => {
  // makeshift solution for now, rework later
  let damageDone = { damage: 0, wasCrit: false }
  switch (id) {
    case SpellIds.doubleAttack:
      damageDone = calculateDamageDone({ isDoubleAttack: true, enemyWeakness }) as DamageDoneProps
      break
    case SpellIds.fireStrike:
      damageDone = calculateSpellDamageDone(id)
      break
  }
  return damageDone
}

export const calculateCritDamage = (baseDamage: number): DamageDoneProps => {
  const { playerStats } = gameState.getState()
  const { critChance, critMulti } = playerStats
  let wasCrit = false
  let damage = baseDamage
  if (critChance) {
    const critRoll = Math.floor(Math.random() * 100) + 1 // 1 - 100
    // crit chance 2, 1 or 2 will pass
    if (critChance >= critRoll) {
      damage = Math.ceil(damage * critMulti)
      wasCrit = true
    }
  }
  return { damage, wasCrit }
}

export const calculateSpellDamageDone = (id: SpellIds): DamageDoneProps => {
  const { playerStats, playerSkills } = gameState.getState()
  const spellData = SPELLS_DATA[id]
  const baseDamage = (spellData.effect as SpellMagicEffectProps).baseDamage + playerStats.magicDamage
  let hit: DamageDoneProps = { damage: baseDamage, wasCrit: false }
  if (playerSkills[SkillIds.spellCrit]) {
    hit = calculateCritDamage(baseDamage)
  }

  return hit
}

export const doSpellDamage = (dispatch: Dispatch<UnknownAction>, id: SpellIds, enemy: BattleStateEnemyProps | null) => {
  if (!enemy) return

  const weakness = ENEMIES_DATA[enemy.id].weakness
  const hit = spellHit(id, weakness)
  const hpAfterDamage = Math.max(0, enemy.currentHp - hit.damage)
  dispatch(updateEnemyHp({ hpAfterDamage, damageForHitSplat: `${hit.damage}${hit.wasCrit ? '!' : ''}` }))

  if (hpAfterDamage <= 0) {
    handleEndBattle(dispatch)
  }
}

export const getSpellCooldown = (spellCooldown: number, cooldownReduction: number) =>
  spellCooldown - (spellCooldown > 10 ? cooldownReduction : 0)

export const getSpellDuration = (spellDuration: number, increasedSpellDuration: number) =>
  (spellDuration += increasedSpellDuration)
