import { gameState } from '../store'
import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { endBattle, updateEnemyHp } from '../store/battle-state'
import { IncreaseStatsPayload, increaseStats } from '../store/player-stats'
import ENEMIES_DATA from '../data/enemiesData'
import { addItemsToInventory } from '../store/player-inventory'
import {
  calculateDamageDone,
  calculateGoldGain,
  calculateEnemyDrops,
  calculateXpGain,
  // checkIfWeaponIsBow,
  // checkIfOffhandIsArrow,
  // handleBowDamage,
} from '../utils/combatUtils'
import { checkForUnlocksByZone } from '../utils/unlockContentUtils'
import { PlayerStatIds } from '../consts/enums/ids/player-stat-ids'

export type DamageDoneProps = {
  damage: number
  wasCrit: boolean
}

// let timestmap = Date.now();

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>): number => {
  // console.log("last battle tick duration: ", Date.now() - timestmap);
  // timestmap = Date.now();

  const { playerStats, battleState } = gameState.getState()
  if (!battleState.isBattleStarted || !battleState.enemy) return playerStats.attackSpeed * 1000

  const enemyWeakness = ENEMIES_DATA[battleState.enemy.id].weakness

  const damageDone = calculateDamageDone({ enemyWeakness })
  const hpAfterDamage = battleState.enemy.currentHp - damageDone.damage
  dispatch(updateEnemyHp({ hpAfterDamage, damageForHitSplat: `${damageDone.damage}${damageDone.wasCrit ? '!' : ''}` }))
  if (hpAfterDamage <= 0) {
    handleEndBattle(dispatch)
  }

  return playerStats.attackSpeed * 1000
}

export const handleEndBattle = (dispatch: Dispatch<UnknownAction>) => {
  const { battleState, playerStats } = gameState.getState()
  if (!battleState.enemy) return
  const statsToUpdate: IncreaseStatsPayload[] = []
  // let itemsToUpdate: InventoryItem[] = [];
  // fix overkill damage
  // const overkillDamage = playerSkills["Overkill"] ? Math.ceil(Math.abs(hpAfterDamage) / (playerSkills["Overkill"] / 4)) : 0;
  dispatch(endBattle({}))
  const enemy = ENEMIES_DATA[battleState.enemy.id]

  // rework experience formula, for now boosted to *100 for testing
  // rework gold gain, currently boosted for testing
  statsToUpdate.push(
    {
      id: PlayerStatIds.experience,
      amount: calculateXpGain(
        playerStats,
        battleState.zoneId,
        battleState.currentWave,
        ENEMIES_DATA[battleState.enemy.id].experience,
      ),
    },
    {
      id: PlayerStatIds.goldCoins,
      amount: calculateGoldGain(playerStats, battleState.zoneId, battleState.currentWave),
    },
  )

  const itemsToUpdate = calculateEnemyDrops(enemy)
  checkForUnlocksByZone(dispatch, battleState.zoneId, battleState.currentWave)
  dispatch(addItemsToInventory(itemsToUpdate))
  dispatch(increaseStats(statsToUpdate))
}

/*
        bow stuff scrapped for now, not a fan
    */

// const hasBowEquipped = checkIfWeaponIsBow(playerEquipment);
// const arrowNameEquipped = checkIfOffhandIsArrow(playerEquipment);

// if (hasBowEquipped) {
//     damageDone = handleBowDamage({dispatch, arrowNameEquipped, playerInventory, playerStats, enemyWeakness});
//     if (!damageDone) {
//         dispatch(updateEnemyHp({hpAfterDamage: battleState.enemy.currentHp, damageForHitSplat: `No arrows.`}));
//         return playerStats.attackSpeed * 1000;
//     }
// } else {
//     damageDone = calculateDamageDone({enemyWeakness});
// }
