import { createAction, createSlice } from '@reduxjs/toolkit'
import ITEM_DATA from '../../data/itemsData'
import { EquipmentInventoryItem } from '../../consts/interfaces/inventory-item.interfaces'
import { EquipmentSlot } from '../../consts/enums/equipment-slot.enum'
import { ItemType } from '../../consts/enums/item-type.enum'

export type PlayerEquipment = {
  [key in keyof typeof EquipmentSlot]: EquipmentInventoryItem | null
}

export type EquipmentSlotNames = keyof PlayerEquipment

const resetAction = createAction('RESET_STATES')
const initialState: PlayerEquipment = {
  weapon: null,
  helmet: null,
  chest: null,
  legs: null,
  boots: null,
  cape: null,
  gloves: null,
  belt: null,
  amulet: null,
  ring: null,
}

export type ItemNameActionProps = {
  payload: EquipmentInventoryItem
  type: string
}

const playerEquipmentSlice = createSlice({
  initialState,
  name: 'playerEquipment',
  reducers: {
    equipItem: (state, action: ItemNameActionProps) => {
      const item = ITEM_DATA[action.payload.id]

      if (item.type !== ItemType.equipment) return

      const slot = EquipmentSlot[item.slot] as keyof typeof EquipmentSlot
      state[slot] = action.payload
    },
    unequipItem: (state, action: ItemNameActionProps) => {
      const item = ITEM_DATA[action.payload.id]
      if (item.type !== ItemType.equipment) return

      const slot = EquipmentSlot[item.slot] as keyof typeof EquipmentSlot
      state[slot] = null
    },
    // removeArrow: (state) => {
    //     state["offhand"] = null;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAction, () => initialState)
  },
})

export default playerEquipmentSlice.reducer
export const { equipItem, unequipItem } = playerEquipmentSlice.actions
