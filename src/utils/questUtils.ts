import { UnknownAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { RequiredQuestProgressProps } from '../data/dialogues/types'
import QUEST_DATA from '../data/questsData'
import { QuestIds } from '../consts/enums/ids/quest-ids.enum'
import { RequirementType } from '../consts/enums/requirement-type.enum'
import { RewardType } from '../consts/enums/reward-type.enum'
import { InventoryItemType } from '../consts/interfaces/inventory-item.interfaces'
import { gameState } from '../store'
import { removeItemsFromInventory, addItemsToInventory } from '../store/player-inventory'
import { decreaseStats, IncreaseStatsPayload, increaseStats } from '../store/player-stats'
import ITEM_DATA from '../data/itemsData'

export const handleProceedQuest = (
  dispatch: Dispatch<UnknownAction>,
  requiredQuestProgress: RequiredQuestProgressProps,
) => {
  const { id, step } = requiredQuestProgress
  const { requirement } = QUEST_DATA[id].steps[step]
  switch (requirement.type) {
    case RequirementType.item: {
      dispatch(
        removeItemsFromInventory([
          { id: requirement.id, amount: requirement.amount, type: ITEM_DATA[requirement.id].type } as InventoryItemType,
        ]),
      )
      break
    }
    case RequirementType.stat: {
      dispatch(decreaseStats([{ id: requirement.id, amount: requirement.amount }]))
      break
    }
  }
}

export const handleCompleteQuest = (dispatch: Dispatch<UnknownAction>, id: QuestIds) => {
  const questData = QUEST_DATA[id]
  const statRewards: IncreaseStatsPayload[] = []
  const itemRewards: InventoryItemType[] = []

  questData.rewards.forEach((reward) => {
    switch (reward.type) {
      case RewardType.item:
        itemRewards.push({ id: reward.id, amount: reward.amount, type: ITEM_DATA[reward.id].type } as InventoryItemType)
        break
        id
      case RewardType.stat:
        statRewards.push({ id: reward.id, amount: reward.amount })
        break
    }
  })
  dispatch(increaseStats(statRewards))
  dispatch(addItemsToInventory(itemRewards))
}
export const checkIfCanShowQuestOption = (requiredQuestProgress: RequiredQuestProgressProps) => {
  const { dialogues } = gameState.getState()
  const { id, step } = requiredQuestProgress
  if (dialogues.quests[id] === step) return true
  return false
}

export const checkIfCanProceedQuest = (requiredQuestProgress: RequiredQuestProgressProps) => {
  const { battleState, playerStats, playerInventory, dialogues } = gameState.getState()
  const { id, step } = requiredQuestProgress
  const { requirement } = QUEST_DATA[id].steps[step]

  switch (requirement.type) {
    case RequirementType.killCount:
      if ((battleState.totalEnemyKillCount[requirement.id] || 0) < requirement.amount) return false
      break
    case RequirementType.item: {
      const item = playerInventory.find((item) => item?.id === requirement.id)
      if (!item || item.amount < requirement.amount) return false
      break
    }
    case RequirementType.stat: {
      const stat = playerStats[requirement.id]
      if (!stat || stat < requirement.amount) return false
      break
    }
    case RequirementType.quest:
      if (dialogues.quests[requirement.id] !== -1) return false
      break
    case RequirementType.wave: {
      const zoneProgression = battleState.zoneWaveProgression[requirement.zoneId]
      if (!zoneProgression) return false

      const waveKillcount = zoneProgression[requirement.wave]
      if (waveKillcount === undefined || waveKillcount < requirement.amount) return false
      break
    }
    default:
    // do nothing
  }

  return true
}
