import {createAction, createSlice} from "@reduxjs/toolkit";
import {SimpleActionProps} from "../store";

export type DialoguesState = {
    currentNpcId: number | null;
    npcDialoguesProgress: Record<number, number>;
};
const resetAction = createAction("RESET_STATES");
const initialState: DialoguesState = {
    currentNpcId: null,
    npcDialoguesProgress: {},
};

const dialoguesSlice = createSlice({
    initialState,
    name: "dialogues",
    reducers: {
        startDialogue: (state, action: SimpleActionProps) => {
            state.currentNpcId = action.payload;
            if (!state.npcDialoguesProgress[action.payload]) state.npcDialoguesProgress[action.payload] = 0;
        },
        nextDialogueMessage: (state, action: SimpleActionProps) => {
            if (state.currentNpcId === null) return;
            state.npcDialoguesProgress[state.currentNpcId] = action.payload;
        },
        closeDialogue: (state) => {
            state.currentNpcId = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default dialoguesSlice.reducer;
export const {startDialogue, nextDialogueMessage, closeDialogue} = dialoguesSlice.actions;
