import { ItemIds } from '../../consts/enums/ids/item-ids.enum'
import { PlayerStatIds } from '../../consts/enums/ids/player-stat-ids'
import { QuestIds } from '../../consts/enums/ids/quest-ids.enum'
import { SpecialDialogueType } from '../../consts/enums/special-dialogue-type.enum'

export type DialogueProps = {
  message: string
  options: OptionsProps[]
}

export type OptionsProps = {
  response: string
  next: number
  nextIfQuestStarted?: number
  requiredQuestProgress?: RequiredQuestProgressProps
  specialResponse?: SpecialResponseProps
  closeDialogue?: true
  opensShop?: true
}

export type SpecialResponseProps =
  | SpecialRequiresStatResponse
  | SpecialRequiresItemResponse
  | SpecialRequiresQuestResponse
  | SpecialStartsQuestResponse
  | SpecialEndsQuestResponse
  | SpecialProgressesQuestResponse

export type RequiredQuestProgressProps = {
  id: QuestIds
  step: number
}

export type SpecialRequiresStatResponse = {
  type: SpecialDialogueType.requiresStat
  id: PlayerStatIds
  amount: number
  label: string
}

export type SpecialRequiresItemResponse = {
  type: SpecialDialogueType.requiresItem
  id: ItemIds
  amount: number
}

export type SpecialRequiresQuestResponse = {
  type: SpecialDialogueType.requiresQuest
  id: QuestIds
}

export type SpecialStartsQuestResponse = {
  type: SpecialDialogueType.startsQuest
  id: QuestIds
}

export type SpecialEndsQuestResponse = {
  type: SpecialDialogueType.endsQuest
  id: QuestIds
}

export type SpecialProgressesQuestResponse = {
  type: SpecialDialogueType.progressesQuests
  id: QuestIds
}
