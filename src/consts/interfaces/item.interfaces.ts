import { EquipmentSlot } from '../enums/equipment-slot.enum'
import { PlayerStatIds } from '../enums/ids/player-stat-ids'
import { ItemTier } from '../enums/item-tier.enum'
import { ItemType } from '../enums/item-type.enum'
import { UsableItemType } from '../enums/usable-item-type.enum'

export interface ItemData {
  name: string
  tier: ItemTier
  value: number
  url: string
  type: ItemType
  description?: string
}

export interface EquipmentItemPossibleStat {
  id: PlayerStatIds
  min: number
  max: number
}

export interface EquipmentItem extends ItemData {
  type: ItemType.equipment
  stats: EquipmentItemPossibleStat[]
  slot: EquipmentSlot
}

export interface ResourceItem extends ItemData {
  type: ItemType.resource
}

export interface RewardsStatsItem extends ItemData {
  type: ItemType.rewardsStats
  stats: {
    id: PlayerStatIds
    amount: number
  }[]
}

export interface QuestItem extends ItemData {
  type: ItemType.quest
}

export interface FoodItem extends ItemData {
  type: ItemType.food
}

export interface BookItem extends ItemData {
  type: ItemType.book
}

export interface PotionItem extends ItemData {
  type: ItemType.potion
}

export type Item = EquipmentItem | ResourceItem | RewardsStatsItem | QuestItem | FoodItem | BookItem | PotionItem

export type UseItemProps = UseItemStatProps

export type UseItemStatProps = {
  type: UsableItemType
  id: PlayerStatIds
  amount: 1
}
