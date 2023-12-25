export type ShopProps = {
    townId: number;
    items: ShopItemProps[];
};
export type ShopItemProps = {
    itemId: number;
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
                itemId: 15,
                maxStock: 1,
                currentStock: 1,
                price: 5000,
            },
            {
                itemId: 16,
                maxStock: 99,
                currentStock: 99,
                refreshable: true,
                price: 10,
            },
            {
                itemId: 17,
                maxStock: 99,
                currentStock: 99,
                refreshable: true,
                price: 25,
            },
        ],
    },
};

export default SHOPS_DATA;
