import { unequipItem } from '.'
import { AppDispatch, GameState } from '..'
import { EquipmentSlot } from '../../consts/enums/equipment-slot.enum'
import { addItemsToInventory } from '../player-inventory'
import { decreaseStats } from '../player-stats'

export const unequipItemThunk = (slot: EquipmentSlot) => {
  return (dispatch: AppDispatch, getState: () => GameState) => {
    const playerEquipment = getState().playerEquipment

    const equipedItem = playerEquipment[EquipmentSlot[slot] as keyof typeof EquipmentSlot]
    if (!equipedItem) return

    dispatch(unequipItem(equipedItem))
    dispatch(decreaseStats(equipedItem.stats))
    dispatch(addItemsToInventory([equipedItem]))
  }
}
