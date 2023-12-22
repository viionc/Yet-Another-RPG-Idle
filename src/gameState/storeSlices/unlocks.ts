import {createAction, createSlice} from "@reduxjs/toolkit";

const resetAction = createAction("RESET_STATES");
export type Unlocks = "crafting" | "towns";

export type UnlocksProps = Partial<Record<Unlocks, boolean>>;
export type UnlockAction = {
    type: string;
    payload: Unlocks[];
};

const initialState: UnlocksProps = {};
const unlocksSlice = createSlice({
    initialState,
    name: "unlocks",
    reducers: {
        unlock: (state, action: UnlockAction) => {
            action.payload.forEach((unlock) => (state[unlock] = true));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default unlocksSlice.reducer;
export const {unlock} = unlocksSlice.actions;
