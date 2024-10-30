import { createAction, createSlice } from '@reduxjs/toolkit'
import { sortByTier } from '../../utils/misc'
import { InventoryAddItemsAction, InventoryItemType } from '../../consts/interfaces/inventory-item.interfaces'
import { ItemType } from '../../consts/enums/item-type.enum'

const resetAction = createAction('RESET_STATES')
const initialState: Array<InventoryItemType | null> = new Array(36).fill(null)

const playerInventorySlice = createSlice({
  initialState,
  name: 'playerInventory',
  reducers: {
    addItemsToInventory: (state, action: InventoryAddItemsAction) => {
      const { payload } = action
      sortByTier(payload)
      payload.forEach((item) => {
        const inventoryItem = state.find((i) => i?.id === item.id)

        if (inventoryItem && inventoryItem.type !== ItemType.equipment) {
          inventoryItem.amount += item.amount
          return
        }

        const emptySlotIndex = state.findIndex((item) => item === null)
        if (emptySlotIndex !== -1) {
          state[emptySlotIndex] = { ...item }
        }
      })
    },
    removeItemsFromInventory: (state, action: InventoryAddItemsAction) => {
      const { payload } = action
      payload.forEach((item) => {
        const inventoryItemIndex =
          item.type === ItemType.equipment
            ? state.findIndex((i) => i?.type === ItemType.equipment && i.uniqueId === item.uniqueId)
            : state.findIndex((i) => i?.id === item.id)
        if (!state[inventoryItemIndex] || inventoryItemIndex === -1) return

        state[inventoryItemIndex].amount -= item.amount
        if (state[inventoryItemIndex].amount === 0) state[inventoryItemIndex] = null
      })
    },
    sortInventory: (state) => {
      let items = [...state]
      items = items.filter((item) => item !== null)
      if (items.length < 2) return

      items = sortByTier(items as InventoryItemType[])
      state = [...items, ...new Array(36 - items.length).fill(null)]
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAction, () => initialState)
  },
})

export const { addItemsToInventory, sortInventory, removeItemsFromInventory } = playerInventorySlice.actions
export default playerInventorySlice.reducer
