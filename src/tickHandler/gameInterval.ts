import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { gameState } from '../store'
import { reduceCooldowns, startBattle } from '../store/battle-state'
import ZONES_DATA from '../data/zonesData'
import { isMaxWave } from '../utils/wavesUtils'
import { decreaseStats, increaseStats } from '../store/player-stats'
import SPELLS_DATA, { SpellSupportStatBuffEffectProps } from '../data/spellsData'
import { refreshStock } from '../store/shops/shops.slice'
import { PlayerStatIds } from '../consts/enums/ids/player-stat-ids'

let timestmap = Date.now()

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(reduceCooldowns())

  const { battleState, playerStats, playerSpells } = gameState.getState()
  console.log('last tick duration: ', Date.now() - timestmap)
  timestmap = Date.now()

  if (battleState.battleCurrentCooldown <= 0 && !battleState.isBattleStarted) {
    const currentZone = ZONES_DATA[battleState.zoneId]
    // if currently player is on last wave of the zone choose boss as an enemy
    if (isMaxWave(battleState.currentWave, currentZone.maxWave)) {
      dispatch(startBattle({ id: currentZone.bossEnemyId }))
    } else {
      const randomEnemyId = Math.floor(Math.random() * currentZone.enemies.length)
      dispatch(startBattle({ id: currentZone.enemies[randomEnemyId] }))
    }
  }

  // reduce active spell durations
  playerSpells.activeSpells.forEach((spell) => {
    if (spell.currentDuration > 1) return
    const effect = SPELLS_DATA[spell.id].effect as SpellSupportStatBuffEffectProps
    const value = effect.id === PlayerStatIds.attackSpeed ? effect.value * -1 : effect.value
    dispatch(decreaseStats([{ id: effect.id, amount: value }]))
  })

  // mana regen timer, if 1 or below increase current mana by 1
  if (playerStats.currentManaRegenTimer <= 0) {
    if (playerStats.mana < playerStats.maxMana) dispatch(increaseStats([{ id: PlayerStatIds.mana, amount: 1 }]))
    dispatch(increaseStats([{ id: PlayerStatIds.currentManaRegenTimer, amount: playerStats.manaRegenRate }]))
  }

  if (playerStats.currentShopRefreshCooldown <= 0) {
    dispatch(refreshStock())
    dispatch(increaseStats([{ id: PlayerStatIds.currentShopRefreshCooldown, amount: playerStats.shopRefreshCooldown }]))
  }
}
