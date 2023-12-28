import {createAction, createSlice} from "@reduxjs/toolkit";
import SHOPS_DATA, {ShopItemProps} from "../../data/shopsData";
import {ItemNames} from "../../data/itemsData";

export type BuyItemActionProps = {
    type: string;
    payload: BuyItemPayloadProps;
};

export type BuyItemPayloadProps = {
    shopId: number;
    name: ItemNames;
    amount: number;
};

const resetAction = createAction("RESET_STATES");
const initialState: Record<number, ShopItemProps[]> = {};

const shops = createSlice({
    initialState,
    name: "shops",
    reducers: {
        buyItems: (state, action: BuyItemActionProps) => {
            const {shopId, name, amount} = action.payload;
            if (!state[shopId]) state[shopId] = SHOPS_DATA[shopId].items;
            const stock = state[shopId];
            const item = stock.find((item) => item.name === name);
            if (!item) return;
            item.currentStock -= amount;
        },
        refreshStock: (state) => {
            for (const id in state) {
                const stock = state[id];
                stock.forEach((item) => {
                    if (item.refreshable && item.currentStock < item.maxStock) item.currentStock++;
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default shops.reducer;
export const {buyItems, refreshStock} = shops.actions;
