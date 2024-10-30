import { ItemIds } from '../consts/enums/ids/item-ids.enum'

export type CraftingRecipeProps = {
  name: string
  unlockRequirement: null
  itemsNeeded: RecipeCost[]
  createsAmount: number
  itemId: ItemIds
}

export type RecipeCost = {
  id: ItemIds
  amount: number
}

const RECIPES_DATA: Partial<Record<ItemIds, CraftingRecipeProps>> = {
  [ItemIds.makeshiftClub]: {
    name: 'Makeshift Club',
    unlockRequirement: null,
    itemsNeeded: [{ id: ItemIds.stick, amount: 10 }],
    createsAmount: 1,
    itemId: ItemIds.makeshiftClub,
  },
  [ItemIds.turtleShellChest]: {
    name: 'Turtle Shell Chest',
    unlockRequirement: null,
    itemsNeeded: [{ id: ItemIds.turtleShell, amount: 25 }],
    createsAmount: 1,
    itemId: ItemIds.turtleShellChest,
  },
  [ItemIds.turtleShellLegs]: {
    name: 'Turtle Shell Legs',
    unlockRequirement: null,
    itemsNeeded: [{ id: ItemIds.turtleShell, amount: 20 }],
    createsAmount: 1,
    itemId: ItemIds.turtleShellLegs,
  },
  [ItemIds.turtleShellBoots]: {
    name: 'Turtle Shell Boots',
    unlockRequirement: null,
    itemsNeeded: [{ id: ItemIds.turtleShell, amount: 10 }],
    createsAmount: 1,
    itemId: ItemIds.turtleShellBoots,
  },
  [ItemIds.turtleShellGloves]: {
    name: 'Turtle Shell Gloves',
    unlockRequirement: null,
    itemsNeeded: [{ id: ItemIds.turtleShell, amount: 10 }],
    createsAmount: 1,
    itemId: ItemIds.turtleShellGloves,
  },
  [ItemIds.turtleShellHelmet]: {
    name: 'Turtle Shell Helmet',
    unlockRequirement: null,
    itemsNeeded: [{ id: ItemIds.turtleShell, amount: 10 }],
    createsAmount: 1,
    itemId: ItemIds.turtleShellHelmet,
  },
}

export default RECIPES_DATA
