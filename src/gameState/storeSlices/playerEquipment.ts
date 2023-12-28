import {createAction, createSlice} from "@reduxjs/toolkit";
import ITEM_DATA, {ItemNames, ItemProps} from "../../data/itemsData";

export type PlayerEquipment = {
    helmet: ItemNames | null;
    chest: ItemNames | null;
    legs: ItemNames | null;
    boots: ItemNames | null;
    weapon: ItemNames | null;
    offhand: ItemNames | null;
    amulet: ItemNames | null;
    ring: ItemNames | null;
    gloves: ItemNames | null;
    belt: ItemNames | null;
};

export type EquipmentSlotNames = keyof PlayerEquipment;

const resetAction = createAction("RESET_STATES");
const initialState: PlayerEquipment = {
    weapon: null,
    helmet: null,
    chest: null,
    legs: null,
    boots: null,
    offhand: null,
    gloves: null,
    belt: null,
    amulet: null,
    ring: null,
};

export type ItemNameActionProps = {
    payload: ItemNames;
    type: string;
};

const playerEquipmentSlice = createSlice({
    initialState,
    name: "playerEquipment",
    reducers: {
        equipItem: (state, action: ItemNameActionProps) => {
            const item = ITEM_DATA[action.payload] as ItemProps;
            if (item.extra?.type !== "equipment") return;
            const slot = item.extra.slot;

            state[slot] = action.payload;
        },
        unequipItem: (state, action: ItemNameActionProps) => {
            const item = ITEM_DATA[action.payload] as ItemProps;
            if (item.extra?.type !== "equipment") return;
            const slot = item.extra.slot;
            state[slot] = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default playerEquipmentSlice.reducer;
export const {equipItem, unequipItem} = playerEquipmentSlice.actions;
