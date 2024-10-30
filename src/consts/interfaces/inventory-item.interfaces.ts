import { ItemIds } from '../enums/ids/item-ids.enum'
import { ItemType } from '../enums/item-type.enum'
import { EquipmentStat } from '../types/equipment-stat.type'

export type InventoryAddItemsAction = {
  payload: InventoryItemType[]
  type: string
}

export type InventoryItemType =
  | EquipmentInventoryItem
  | ResourceInventoryItem
  | QuestInventoryItem
  | BookInventoryItem
  | PotionInventoryItem
  | RewardsStatsInventoryItem
  | FoodInventoryItem

export type InventoryItem = {
  id: ItemIds
  amount: number
  type: ItemType
}

export interface EquipmentInventoryItem extends InventoryItem {
  type: ItemType.equipment
  uniqueId: string
  stats: EquipmentStat[]
}

export interface ResourceInventoryItem extends InventoryItem {
  type: ItemType.resource
}

export interface QuestInventoryItem extends InventoryItem {
  type: ItemType.quest
}

export interface BookInventoryItem extends InventoryItem {
  type: ItemType.book
}

export interface PotionInventoryItem extends InventoryItem {
  type: ItemType.potion
}

export interface RewardsStatsInventoryItem extends InventoryItem {
  type: ItemType.rewardsStats
}

export interface FoodInventoryItem extends InventoryItem {
  type: ItemType.food
}
