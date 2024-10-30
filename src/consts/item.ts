import { ItemTier } from './enums/item-tier.enum'
import { ItemType } from './enums/item-type.enum'

export const colorsByItemTier: Record<ItemTier, string> = {
  [ItemTier.trash]: 'rgb(180, 180, 180, 0.6)',
  [ItemTier.normal]: 'rgb(255, 255, 255, 0.6)',
  [ItemTier.uncommon]: 'rgb(60, 179, 113, 0.6)',
  [ItemTier.rare]: 'rgb(0, 118, 255, 0.6)',
  [ItemTier.epic]: 'rgb(179, 64, 255, 0.6)',
  [ItemTier.legendary]: 'rgb(255, 152, 25, 0.6)',
}

export const tierToString: Record<ItemTier, string> = {
  [ItemTier.trash]: 'Trash',
  [ItemTier.normal]: 'Normal',
  [ItemTier.uncommon]: 'Uncommon',
  [ItemTier.rare]: 'Rare',
  [ItemTier.epic]: 'Epic',
  [ItemTier.legendary]: 'Legendary',
}

export const clickableItemTypes = [
  ItemType.equipment,
  ItemType.potion,
  ItemType.food,
  ItemType.rewardsStats,
  ItemType.book,
]
