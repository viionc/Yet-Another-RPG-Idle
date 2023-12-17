import {createAction, createSlice} from "@reduxjs/toolkit";
import ITEM_DATA, {ITEM_TIER_VALUE} from "../../data/itemsData";
import {equipItem} from "./playerEquipment";

export type InventoryItem = {
    id: number;
    amount: number;
};

type InventoryAddItemsAction = {
    payload: InventoryItem[];
    type: string;
};
const resetAction = createAction("RESET_STATES");
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
        removeItemsFromInventory: (state, action: InventoryAddItemsAction) => {
            const {payload} = action;
            payload.forEach((item) => {
                const inventoryItemIndex = state.findIndex((_item) => (_item ? _item.id === item.id : null));
                if (!state[inventoryItemIndex] || inventoryItemIndex === -1) return;
                (state[inventoryItemIndex] as InventoryItem).amount -= item.amount;
                if ((state[inventoryItemIndex] as InventoryItem).amount === 0) state[inventoryItemIndex] = null;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetAction, () => initialState)
            .addCase(equipItem, (state, action) => {
                playerInventorySlice.caseReducers.removeItemsFromInventory(state, {
                    payload: [{amount: 1, id: action.payload}],
                    type: "playerInventory/removeItemsFromInventory",
                });
            });
    },
});

export const {addItemsToInventory} = playerInventorySlice.actions;
export default playerInventorySlice.reducer;
