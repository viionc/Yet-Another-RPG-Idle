import {createAction, createSlice} from "@reduxjs/toolkit";
import {addItemsToInventory} from "./playerInventory";
import {checkForUnlocksByItem} from "../../utils/unlockContentUtils";
import {UnlockKey} from "../../data/texts/tutorials";

const resetAction = createAction("RESET_STATES");

export type UnlocksProps = Partial<Record<UnlockKey, boolean>>;
export type UnlockAction = {
    type: string;
    payload: UnlockKey;
};

export type PlayerUnlockedContentProps = {
    unlocked: Partial<Record<UnlockKey, boolean>>;
    allTutorialsShown: UnlockKey[];
    currentTutorialId: UnlockKey | null;
};

const initialState: PlayerUnlockedContentProps = {
    unlocked: {},
    allTutorialsShown: [],
    currentTutorialId: null,
};
const playerUnlockedContentSlice = createSlice({
    initialState,
    name: "playerUnlockedContent",
    reducers: {
        unlock: (state, action: UnlockAction) => {
            if (state.unlocked[action.payload]) return;
            state.unlocked[action.payload] = true;
            state.allTutorialsShown.push(action.payload);
            state.currentTutorialId = action.payload;
        },
        hideTutorial: (state) => {
            state.currentTutorialId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetAction, () => initialState)
            .addCase(addItemsToInventory, (state, action) => {
                action.payload.forEach((item) => {
                    const hadUnlock = checkForUnlocksByItem(item.name, state.unlocked);
                    if (hadUnlock && !state.unlocked[hadUnlock]) {
                        playerUnlockedContentSlice.caseReducers.unlock(state, {type: "", payload: hadUnlock});
                    }
                });
            });
    },
});

export default playerUnlockedContentSlice.reducer;
export const {unlock, hideTutorial} = playerUnlockedContentSlice.actions;
