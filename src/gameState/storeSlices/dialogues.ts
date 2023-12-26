import {createAction, createSlice} from "@reduxjs/toolkit";
import {SimpleActionProps} from "../store";

export type QuestProgress = {
    id: number;
    currentProgress: number; // -1 = completed
};

export type DialoguesState = {
    currentNpcId: number | null;
    npcDialoguesProgress: Record<number, number>;
    quests: Record<number, number>;
    questCompletedIdForModal: number | null;
    shopOpen: boolean;
};
const resetAction = createAction("RESET_STATES");
const initialState: DialoguesState = {
    currentNpcId: null,
    npcDialoguesProgress: {},
    quests: {},
    questCompletedIdForModal: null,
    shopOpen: false,
};

const dialoguesSlice = createSlice({
    initialState,
    name: "dialogues",
    reducers: {
        startDialogue: (state, action: SimpleActionProps) => {
            state.currentNpcId = action.payload;
            if (!state.npcDialoguesProgress[action.payload]) state.npcDialoguesProgress[action.payload] = 1;
        },
        nextDialogueMessage: (state, action: SimpleActionProps) => {
            if (state.currentNpcId === null) return;
            state.npcDialoguesProgress[state.currentNpcId] = action.payload;
        },
        closeDialogue: (state) => {
            state.currentNpcId = null;
        },
        startQuest: (state, action: SimpleActionProps) => {
            state.quests[action.payload] = 1;
        },
        progressQuest: (state, action: SimpleActionProps) => {
            const questProgress = state.quests[action.payload] ?? 1;
            state.quests[action.payload] = questProgress + 1;
        },
        endQuest: (state, action: SimpleActionProps) => {
            state.quests[action.payload] = -1;
            state.questCompletedIdForModal = action.payload;
        },
        hideQuestCompletedPopUp: (state) => {
            state.questCompletedIdForModal = null;
        },
        openShopTab: (state) => {
            state.shopOpen = true;
        },
        closeShopTab: (state) => {
            state.shopOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export default dialoguesSlice.reducer;
export const {
    startDialogue,
    nextDialogueMessage,
    closeDialogue,
    startQuest,
    progressQuest,
    endQuest,
    hideQuestCompletedPopUp,
    openShopTab,
    closeShopTab,
} = dialoguesSlice.actions;
