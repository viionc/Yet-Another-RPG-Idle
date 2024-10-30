import { abbreviateNumber } from 'js-abbreviation-number'
import ITEM_DATA from '../data/itemsData'
import { RequirementProps } from '../data/questsData'
import { gameState } from '../store'
import { RequirementType } from '../consts/enums/requirement-type.enum'
import { InventoryItemType } from '../consts/interfaces/inventory-item.interfaces'

export const short = (number: number) => {
  const symbols = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
  return abbreviateNumber(number, 2, { symbols })
}

export const sortByTier = (array: InventoryItemType[]): InventoryItemType[] => {
  array.sort((a, b) => {
    const itemA = ITEM_DATA[a.id]
    const itemB = ITEM_DATA[b.id]
    return itemB.tier - itemA.tier
  })

  return array
}

export const checkIfMeetsRequirements = (requirement: RequirementProps): boolean => {
  const { playerInventory, playerStats, dialogues } = gameState.getState()

  switch (requirement.type) {
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
    case RequirementType.quest: {
      const quest = dialogues.quests[requirement.id]
      if (!quest || (requirement.step && quest < requirement.step)) return false
    }
  }

  return true
}
