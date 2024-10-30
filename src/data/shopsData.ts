import { ItemIds } from '../consts/enums/ids/item-ids.enum'
import { ShopIds } from '../consts/enums/ids/shop-ids.enum'
import { TownIds } from '../consts/enums/ids/town-ids.enum'

export type ShopProps = {
  townId: TownIds
  items: ShopItemProps[]
}
export type ShopItemProps = {
  itemId: ItemIds
  maxStock: number
  currentStock: number
  refreshable?: true
  price: number
}

const SHOPS_DATA: Record<TownIds, ShopProps> = {
  [ShopIds.laHarparShop]: {
    townId: TownIds.laHarpar,
    items: [
      {
        itemId: ItemIds.skillPointBook,
        maxStock: 1,
        currentStock: 1,
        price: 5000,
      },
      {
        itemId: ItemIds.fishMeat,
        maxStock: 99,
        currentStock: 99,
        refreshable: true,
        price: 10,
      },
      {
        itemId: ItemIds.apple,
        maxStock: 99,
        currentStock: 99,
        refreshable: true,
        price: 25,
      },
      {
        itemId: ItemIds.woodenBow,
        maxStock: 1,
        currentStock: 1,
        refreshable: true,
        price: 2500,
      },
    ],
  },
}

export default SHOPS_DATA
