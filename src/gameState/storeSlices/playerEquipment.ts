import {createAction, createSlice} from "@reduxjs/toolkit";
import ITEM_DATA from "../../data/itemsData";
import {SimpleActionProps} from "../store";

export type PlayerEquipment = {
    helmet: number | null;
    chest: number | null;
    legs: number | null;
    boots: number | null;
    weapon: number | null;
    offhand: number | null;
    amulet: number | null;
    ring: number | null;
    gloves: number | null;
    belt: number | null;
};

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

const playerEquipmentSlice = createSlice({
    initialState,
    name: "playerEquipment",
    reducers: {
        equipItem: (state, action: SimpleActionProps) => {
            const extra = ITEM_DATA[action.payload].extra;
            if (extra?.type !== "equipment") return;
            const slot = extra.slot;

            state[slot] = action.payload;
        },
        unequipItem: (state, action: SimpleActionProps) => {
            const extra = ITEM_DATA[action.payload].extra;
            if (extra?.type !== "equipment") return;
            const slot = extra.slot;
            state[slot] = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default playerEquipmentSlice.reducer;
export const {equipItem, unequipItem} = playerEquipmentSlice.actions;
