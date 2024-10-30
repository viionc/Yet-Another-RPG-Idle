import { CraftingRecipeProps } from '../../data/recipesData'
import { AppDispatch, GameState, thunkDispatch } from '..'
import { removeItemsFromInventory, addItemsToInventory } from '.'
import ITEM_DATA from '../../data/itemsData'
import { InventoryItemType } from '../../consts/interfaces/inventory-item.interfaces'
import { generateEquipmentItem } from '../../utils/generateEquipmentItem'
import { equipItem } from '../player-equipment'
import { increaseStats } from '../player-stats'
import { unequipItemThunk } from '../player-equipment/player-equipment.thunks'
import { EquipmentItem } from '../../consts/interfaces/item.interfaces'
import { ItemType } from '../../consts/enums/item-type.enum'

export const craftItemThunk = (recipe: CraftingRecipeProps) => {
  return (dispatch: AppDispatch, getState: () => GameState) => {
    const playerInventory = getState().playerInventory
    const itemsToRemove = []

    for (let i = 0; i < recipe.itemsNeeded.length; i++) {
      const itemNeeded = recipe.itemsNeeded[i]
      const inventoryItem = playerInventory.find((item) => item?.id === itemNeeded.id)
      if (!inventoryItem || inventoryItem.amount < itemNeeded.amount) return

      const { type } = ITEM_DATA[itemNeeded.id]
      itemsToRemove.push({ id: itemNeeded.id, amount: itemNeeded.amount, type } as InventoryItemType)
    }

    dispatch(removeItemsFromInventory(itemsToRemove))

    dispatch(addItemsToInventory(generateEquipmentItem(recipe.itemId)))
  }
}

export const equipItemThunk = (uniqueId: string) => {
  return (dispatch: AppDispatch, getState: () => GameState) => {
    const playerInventory = getState().playerInventory

    const itemToEquip = playerInventory.find(
      (item) => item && item.type === ItemType.equipment && item.uniqueId === uniqueId,
    )

    if (!itemToEquip || itemToEquip.type !== ItemType.equipment) return

    const { slot } = ITEM_DATA[itemToEquip.id] as EquipmentItem
    thunkDispatch(unequipItemThunk(slot))

    dispatch(removeItemsFromInventory([itemToEquip]))
    dispatch(equipItem(itemToEquip))
    dispatch(increaseStats(itemToEquip.stats))
  }
}

// export const useItem = (id: ItemIds) => {
//   return (dispatch: AppDispatch, getState: () => GameState) => {
//     const useData = ITEM_DATA[id]
//   }
// }
