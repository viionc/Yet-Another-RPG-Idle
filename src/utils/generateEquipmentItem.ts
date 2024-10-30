import { Random } from 'random-js'
import { EquipmentStat } from '../consts/types/equipment-stat.type'
import ITEM_DATA from '../data/itemsData'
import { EquipmentInventoryItem } from '../consts/interfaces/inventory-item.interfaces'
import uuid from '../consts/uuid'
import { ItemIds } from '../consts/enums/ids/item-ids.enum'
import { ItemType } from '../consts/enums/item-type.enum'

export const generateEquipmentItem = (id: ItemIds, amount = 1): EquipmentInventoryItem[] => {
  const random = new Random()
  const items = [] as EquipmentInventoryItem[]
  for (let i = 0; i < amount; i++) {
    const itemData = ITEM_DATA[id]
    if (itemData.type !== ItemType.equipment) continue

    const stats: EquipmentStat[] = itemData.stats.map((stat) => ({
      id: stat.id,
      amount: random.integer(stat.min, stat.max),
    }))

    const item: EquipmentInventoryItem = {
      id,
      uniqueId: uuid(),
      type: itemData.type,
      amount: 1,
      stats,
    }

    items.push(item)
  }

  return items
}
