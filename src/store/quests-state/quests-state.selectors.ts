import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { GameState } from '..'
import { QuestProgress } from '.'
import { NpcIds } from '../../consts/enums/ids/npc-ids.enum'
import { QuestIds } from '../../consts/enums/ids/quest-ids.enum'
import { QuestProgression } from '../../consts/enums/quest-progression.enum'

const selectSelf = (state: GameState) => state.dialogues

export const selectCompletedQuests = createDraftSafeSelector(selectSelf, (state) => {
  const completedQuests: QuestProgress[] = []

  for (const id in state.quests) {
    const questId = parseInt(id) as QuestIds

    if (state.quests[questId] === QuestProgression.completed) {
      completedQuests.push({ id: questId, currentProgress: state.quests[questId] })
    }
  }

  return completedQuests
})

export const selectStartedQuests = createDraftSafeSelector(selectSelf, (state) => {
  const startedQuests: QuestProgress[] = []

  for (const id in state.quests) {
    const questId = parseInt(id) as QuestIds

    if (state.quests[questId] && state.quests[questId] >= QuestProgression.started) {
      startedQuests.push({ id: questId, currentProgress: state.quests[questId] })
    }
  }

  return startedQuests
})

export const selectNpcDialogueProgress = (id: NpcIds) => {
  return createDraftSafeSelector(selectSelf, (state) => {
    return state.npcDialoguesProgress[id]
  })
}
