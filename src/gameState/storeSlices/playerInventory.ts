import {createAction, createSlice} from "@reduxjs/toolkit";
import {equipItem} from "./playerEquipment";
import {sortByTier} from "../../utils/misc";

export type InventoryItem = {
    id: number;
    amount: number;
};

type InventoryAddItemsAction = {
    payload: InventoryItem[];
    type: string;
};

export type MoveItemsAction = {
    type: string;
    payload: {
        selectedIndex: number;
        targetIndex: number;
    };
};
const resetAction = createAction("RESET_STATES");
const initialState: Array<InventoryItem | null> = new Array(40).fill(null);

const playerInventorySlice = createSlice({
    initialState,
    name: "playerInventory",
    reducers: {
        addItemsToInventory: (state, action: InventoryAddItemsAction) => {
            const {payload} = action;
            sortByTier(payload);
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
        sortInventory: (state) => {
            let items = [...state];
            items = items.filter((item) => item !== null);
            if (items.length < 2) return;
            items = sortByTier(items as InventoryItem[]);
            state = [...items, ...new Array(40 - items.length).fill(null)];
            return state;
        },
        moveItemsInInventory: (state, action: MoveItemsAction) => {
            const {selectedIndex, targetIndex} = action.payload;
            const temp = state[targetIndex];
            state[targetIndex] = state[selectedIndex];
            state[selectedIndex] = temp;
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

export const {addItemsToInventory, sortInventory, removeItemsFromInventory, moveItemsInInventory} = playerInventorySlice.actions;
export default playerInventorySlice.reducer;
