import {createAction, createSlice} from "@reduxjs/toolkit";
import {SimpleActionProps} from "../store";

export type QuestProgress = {
    id: number;
    currentProgress: number; // -1 = completed
};

export type DialoguesState = {
    currentNpcId: number | null;
    npcDialoguesProgress: Record<number, number>;
    questProgress: Record<number, number>;
};
const resetAction = createAction("RESET_STATES");
const initialState: DialoguesState = {
    currentNpcId: null,
    npcDialoguesProgress: {},
    questProgress: {},
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
        startQuest: (state, action: SimpleActionProps) => {
            state.questProgress[action.payload] = 0;
        },
        progressQuest: (state, action: SimpleActionProps) => {
            const questProgress = state.questProgress[action.payload] ?? 0;
            state.questProgress[action.payload] = questProgress + 1;
        },
        endQuest: (state, action: SimpleActionProps) => {
            state.questProgress[action.payload] = -1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default dialoguesSlice.reducer;
export const {startDialogue, nextDialogueMessage, closeDialogue, startQuest, progressQuest, endQuest} = dialoguesSlice.actions;
