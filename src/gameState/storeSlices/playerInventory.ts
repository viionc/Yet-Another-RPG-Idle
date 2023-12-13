import {createSlice} from "@reduxjs/toolkit";
import ITEM_DATA, {ITEM_TIER_VALUE} from "../../data/itemsData";

export type InventoryItem = {
    id: number;
    amount: number;
};

type InventoryAddItemsAction = {
    payload: InventoryItem[];
    type: string;
};

const initialState: Array<InventoryItem | null> = new Array(40).fill(null);

const playerInventorySlice = createSlice({
    initialState,
    name: "playerInventory",
    reducers: {
        addItemsToInventory: (state, action: InventoryAddItemsAction) => {
            const {payload} = action;
            payload.sort((a, b) => {
                const itemA = ITEM_DATA[a.id];
                const itemB = ITEM_DATA[b.id];
                return ITEM_TIER_VALUE[itemB.tier] - ITEM_TIER_VALUE[itemA.tier];
            });
            payload.forEach((item) => {
                const inventoryItem = state.find((_item) => (_item ? _item.id === item.id : null));
                if (inventoryItem) {
                    inventoryItem.amount += item.amount;
                } else {
                    const emptySlotIndex = state.findIndex((item) => item === null);
                    if (emptySlotIndex !== -1) {
                        state[emptySlotIndex] = {...item};
                    }
                }
            });
        },
    },
});

export default playerInventorySlice.reducer;
export const {addItemsToInventory} = playerInventorySlice.actions;
