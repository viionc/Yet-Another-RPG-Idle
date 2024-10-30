import { createAction, createSlice } from '@reduxjs/toolkit'
import { SimpleNumberActionProps } from '..'
import { NpcIds } from '../../consts/enums/ids/npc-ids.enum'
import { QuestIds } from '../../consts/enums/ids/quest-ids.enum'
import { QuestProgression } from '../../consts/enums/quest-progression.enum'

export type QuestProgress = {
  id: QuestIds
  currentProgress: number // -1 = completed
}

export type DialoguesState = {
  currentNpcId: NpcIds | null
  npcDialoguesProgress: Partial<Record<NpcIds, number>>
  quests: Partial<Record<QuestIds, QuestProgression>>
  questCompletedIdForModal: QuestIds | null
  shopOpen: boolean
}

export type SimpleQuestAction = {
  type: string
  payload: {
    id: QuestIds
  }
}

export type SimpleNpcAction = {
  type: string
  payload: {
    id: NpcIds
  }
}

const resetAction = createAction('RESET_STATES')
const initialState: DialoguesState = {
  currentNpcId: null,
  npcDialoguesProgress: {},
  quests: {},
  questCompletedIdForModal: null,
  shopOpen: false,
}

const dialoguesSlice = createSlice({
  initialState,
  name: 'dialogues',
  reducers: {
    startDialogue: (state, action: SimpleNpcAction) => {
      state.currentNpcId = action.payload.id
      if (!state.npcDialoguesProgress[action.payload.id]) state.npcDialoguesProgress[action.payload.id] = 0
    },
    nextDialogueMessage: (state, action: SimpleNumberActionProps) => {
      if (state.currentNpcId === null) return
      state.npcDialoguesProgress[state.currentNpcId] = action.payload
    },
    closeDialogue: (state) => {
      state.currentNpcId = null
    },
    startQuest: (state, action: SimpleQuestAction) => {
      state.quests[action.payload.id] = 1
    },
    progressQuest: (state, action: SimpleQuestAction) => {
      const questProgress = state.quests[action.payload.id] ?? 1
      state.quests[action.payload.id] = questProgress + 1
    },
    endQuest: (state, action: SimpleQuestAction) => {
      state.quests[action.payload.id] = -1
      state.questCompletedIdForModal = action.payload.id
    },
    hideQuestCompletedModal: (state) => {
      state.questCompletedIdForModal = null
    },
    openShopTab: (state) => {
      state.shopOpen = true
    },
    closeShopTab: (state) => {
      state.shopOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAction, () => initialState)
  },
})

export default dialoguesSlice.reducer
export const {
  startDialogue,
  nextDialogueMessage,
  closeDialogue,
  startQuest,
  progressQuest,
  endQuest,
  hideQuestCompletedModal,
  openShopTab,
  closeShopTab,
} = dialoguesSlice.actions
