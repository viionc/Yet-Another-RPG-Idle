import { createAction, createSlice } from '@reduxjs/toolkit'
import SHOPS_DATA, { ShopItemProps } from '../../data/shopsData'
import { ItemIds } from '../../consts/enums/ids/item-ids.enum'
import { ShopIds } from '../../consts/enums/ids/shop-ids.enum'

export type BuyItemActionProps = {
  type: string
  payload: BuyItemPayloadProps
}

export type UpdateStockActionProps = {
  type: string
  payload: UpdateStockPayloadProps
}

export type UpdateStockPayloadProps = {
  newItems: ShopItemProps[]
  shopId: ShopIds
}

export type BuyItemPayloadProps = {
  shopId: ShopIds
  itemId: ItemIds
  amount: number
}

const resetAction = createAction('RESET_STATES')
const initialState: Partial<Record<ShopIds, ShopItemProps[]>> = {}

const shops = createSlice({
  initialState,
  name: 'shops',
  reducers: {
    buyItems: (state, action: BuyItemActionProps) => {
      const { shopId, itemId, amount } = action.payload
      if (!state[shopId]) state[shopId] = SHOPS_DATA[shopId].items

      const stock = state[shopId]
      const item = stock.find((item) => item.itemId === itemId)
      if (!item) return

      item.currentStock -= amount
    },
    refreshStock: (state) => {
      for (const id in state) {
        const stock = state[parseInt(id) as ShopIds]
        stock?.forEach((item) => {
          if (item.refreshable && item.currentStock < item.maxStock) item.currentStock++
        })
      }
    },
    updateStock: (state, action: UpdateStockActionProps) => {
      state[action.payload.shopId] = [...(state[action.payload.shopId] ?? []), ...action.payload.newItems]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAction, () => initialState)
  },
})

export default shops.reducer
export const { buyItems, refreshStock, updateStock } = shops.actions
