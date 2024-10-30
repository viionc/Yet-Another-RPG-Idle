import { createPortal } from 'react-dom'
import NPC_Data from '../../data/npcData'
import { useDispatch, useSelector } from 'react-redux'
import CloseButton from '../ui/CloseButton'
import {
  closeDialogue,
  endQuest,
  nextDialogueMessage,
  openShopTab,
  progressQuest,
  startQuest,
} from '../../store/quests-state'
import { GameState } from '../../store'
import { OptionsProps, RequiredQuestProgressProps } from '../../data/dialogues/types'
import { decreaseStats } from '../../store/player-stats'
import { removeItemsFromInventory } from '../../store/player-inventory'
import DialogueSpecialOption from './DialogueSpecialOption'
import React from 'react'
import {
  checkIfCanProceedQuest,
  handleProceedQuest,
  handleCompleteQuest,
  checkIfCanShowQuestOption,
} from '../../utils/questUtils'
import { selectNpcDialogueProgress } from '../../store/quests-state/quests-state.selectors'
import { ItemIds } from '../../consts/enums/ids/item-ids.enum'
import { NpcIds } from '../../consts/enums/ids/npc-ids.enum'
import { SpecialDialogueType } from '../../consts/enums/special-dialogue-type.enum'
import { InventoryItem, InventoryItemType } from '../../consts/interfaces/inventory-item.interfaces'
import ITEM_DATA from '../../data/itemsData'

function DialogueModal({ id }: { id: NpcIds }) {
  const dispatch = useDispatch()
  const { quests } = useSelector((state: GameState) => state.dialogues)
  const playerStats = useSelector((state: GameState) => state.playerStats)
  const playerInventory = useSelector((state: GameState) => state.playerInventory)
  const npc = NPC_Data[id]
  const npcDialogueProgress = useSelector(selectNpcDialogueProgress(id))

  if (!npc || !npcDialogueProgress || npcDialogueProgress < 0) return

  const message = npc.dialogues[npcDialogueProgress].message
  const options = npc.dialogues[npcDialogueProgress].options

  const close = () => {
    dispatch(closeDialogue())
  }

  const next = (option: OptionsProps) => {
    if (option.specialResponse) {
      const { specialResponse: special } = option
      switch (special.type) {
        case SpecialDialogueType.requiresStat:
          if (playerStats[special.id] < special.amount) return
          dispatch(decreaseStats([{ id: special.id, amount: special.amount }]))
          break
        case SpecialDialogueType.requiresItem:
          if (itemsInInventory(special.id) < special.amount) return
          dispatch(
            removeItemsFromInventory([
              { id: special.id, amount: special.amount, type: ITEM_DATA[special.id].type } as InventoryItemType,
            ]),
          )
          break
        case SpecialDialogueType.startsQuest:
          dispatch(startQuest({ id: special.id }))
          break
        case SpecialDialogueType.endsQuest:
          dispatch(endQuest({ id: special.id }))
          handleCompleteQuest(dispatch, special.id)
          break
        case SpecialDialogueType.requiresQuest:
          if (option.requiredQuestProgress && !checkIfCanProceedQuest(option.requiredQuestProgress)) return
          handleProceedQuest(dispatch, option.requiredQuestProgress as RequiredQuestProgressProps)
          dispatch(progressQuest({ id: special.id }))
          break
      }
    }

    if (option.opensShop) {
      dispatch(openShopTab())
      close()
    }

    const nextDialogue = checkIfNextDialogueStartsQuest(option)
    dispatch(nextDialogueMessage(nextDialogue))
    if (option.closeDialogue) close()
  }

  const checkIfNextDialogueStartsQuest = (option: OptionsProps): number => {
    const doesNextDialogueStartAQuest = npc.dialogues[option.next].options.find((option) => option.nextIfQuestStarted)
    if (!doesNextDialogueStartAQuest) return option.next

    const { specialResponse: special } = doesNextDialogueStartAQuest
    if (special && special.type === SpecialDialogueType.startsQuest && quests[special.id] !== undefined) {
      return doesNextDialogueStartAQuest.nextIfQuestStarted as number
    }
    return option.next
  }

  const itemsInInventory = (id: ItemIds): number => {
    const item = playerInventory.find((item) => item && item.id === id) as InventoryItem
    if (item) return item.amount
    return -1
  }

  return createPortal(
    <article
      className="absolute top-0 left-0 bg-opacity-25 bg-black border-slate-800 w-full h-full text-white flex justify-center items-center z-[100]"
      onClick={close}
    >
      <div
        className="bg-zinc-800 min-h-[33%] w-1/2 mb-52 p-6 rounded-md border-slate-700 border relative z-[110]"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          position="top-right"
          callback={close}
        />
        <div className="flex gap-2 w-full mb-4">
          <div className="w-full">
            <h2 className="text-yellow-500 text-2xl mb-2">{npc.name}</h2>
            <p className="mb-8 text-xl">{message}</p>
          </div>
          <img
            src={npc.url}
            alt={npc.name}
            height="156"
            width="156"
          />
        </div>
        <ul className="flex flex-col gap-2">
          {options.map((option, index) => {
            if (option.requiredQuestProgress && !checkIfCanShowQuestOption(option.requiredQuestProgress)) {
              return <React.Fragment key={index}></React.Fragment>
            }
            return (
              <li
                key={index}
                onClick={() => next(option)}
                className="group border px-2 py-2 hover:bg-yellow-500 hover:text-black rounded-md cursor-pointer"
              >
                {option.response}
                {option.specialResponse ? <DialogueSpecialOption special={option.specialResponse} /> : null}
              </li>
            )
          })}
        </ul>
      </div>
    </article>,
    document.getElementById('dialogue-modal') as HTMLElement,
  )
}

export default DialogueModal
