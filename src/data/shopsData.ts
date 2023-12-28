import {ItemNames} from "./itemsData";

export type ShopProps = {
    townId: number;
    items: ShopItemProps[];
};
export type ShopItemProps = {
    name: ItemNames;
    maxStock: number;
    currentStock: number;
    refreshable?: true;
    price: number;
};

//                  number = townId
const SHOPS_DATA: Record<number, ShopProps> = {
    0: {
        townId: 0,
        items: [
            {
                name: "Skill Point Book",
                maxStock: 1,
                currentStock: 1,
                price: 5000,
            },
            {
                name: "Fish Meat",
                maxStock: 99,
                currentStock: 99,
                refreshable: true,
                price: 10,
            },
            {
                name: "Apple",
                maxStock: 99,
                currentStock: 99,
                refreshable: true,
                price: 25,
            },
            {
                name: "Stone Arrow",
                maxStock: 99,
                currentStock: 99,
                refreshable: true,
                price: 10,
            },
        ],
    },
};

export default SHOPS_DATA;
