import { useSelector } from 'react-redux'
import ITEM_DATA from '../../data/itemsData'
import QUEST_DATA from '../../data/questsData'
import { GameState } from '../../store'
import ENEMIES_DATA from '../../data/enemiesData'
import ZONES_DATA from '../../data/zonesData'
import { SpecialResponseProps } from '../../data/dialogues/types'
import { RequirementType } from '../../consts/enums/requirement-type.enum'
import { SpecialDialogueType } from '../../consts/enums/special-dialogue-type.enum'

type DialogueSpecialOptionProps = {
  special: SpecialResponseProps
}

function DialogueSpecialOption({ special }: DialogueSpecialOptionProps) {
  const { quests } = useSelector((state: GameState) => state.dialogues)

  switch (special.type) {
    case SpecialDialogueType.startsQuest: {
      const quest = QUEST_DATA[special.id]

      return <span className="ml-4 text-cyan-500 group-hover:text-black">Starts {quest.name} Quest</span>
    }
    case SpecialDialogueType.progressesQuests: {
      const quest = QUEST_DATA[special.id]
      const step = quests[special.id]

      if (!Number(step)) return

      const { requirement } = quest.steps[step as number]
      let text = ''
      switch (requirement.type) {
        case RequirementType.killCount:
          text = `${requirement.amount} ${ENEMIES_DATA[requirement.id].name} Killed`
          break
        case RequirementType.item:
          text = `${requirement.amount} ${ITEM_DATA[requirement.id].name}`
          break
        case RequirementType.stat:
          text = `${requirement.amount} ${requirement.label}`
          break
        case RequirementType.quest:
          text = `${QUEST_DATA[requirement.id].name} Completed`
          break
        case RequirementType.wave:
          text = `${requirement.amount} killcount on wave ${requirement.wave} in ${ZONES_DATA[requirement.zoneId].name}`
      }

      return <span className="ml-4 text-cyan-500 group-hover:text-black">Requires {text}</span>
    }
    case SpecialDialogueType.requiresItem: {
      const item = ITEM_DATA[special.id]

      return (
        <span className="ml-4 text-green-600 group-hover:text-black">
          Requires: {special.amount} {item.name}
        </span>
      )
    }
    case SpecialDialogueType.requiresStat: {
      return (
        <span className="ml-4 text-yellow-500 group-hover:text-black">
          Costs {special.amount} {special.label}
        </span>
      )
    }
  }
}

export default DialogueSpecialOption
