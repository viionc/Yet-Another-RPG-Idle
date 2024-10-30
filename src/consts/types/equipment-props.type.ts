import { EquipmentSlot } from '../enums/equipment-slot.enum'
import { ItemIds } from '../enums/ids/item-ids.enum'
import { EquipmentStat } from './equipment-stat.type'

export interface EquipmentProps {
  id: string
  itemId: ItemIds
  slot: EquipmentSlot
  stats: EquipmentStat
  enhancementLevel: number
}
