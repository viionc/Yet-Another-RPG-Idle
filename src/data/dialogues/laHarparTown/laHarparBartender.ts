import { PlayerStatIds } from '../../../consts/enums/ids/player-stat-ids'
import { QuestIds } from '../../../consts/enums/ids/quest-ids.enum'
import { SpecialDialogueType } from '../../../consts/enums/special-dialogue-type.enum'
import { DialogueProps } from '../types'

const LA_HARPAR_BARTENDER: Record<number, DialogueProps> = {
  0: {
    message: "Oi, you! Quick, what do you want?! Can't you see how busy this place is?",
    options: [
      {
        response: 'Looks quite empty to me.',
        next: 1,
      },
      { response: "I'm sorry, I have a few questions, if you may.", next: 2 },
    ],
  },
  1: {
    message: "I'll remember your face, smartass. Next order is gonna cost you more.",
    options: [{ response: "I'm sorry, I have few questions if you may.", next: 2 }],
  },
  2: {
    message: 'Ask away, my answers have prices though.',
    options: [
      {
        response: "I'm going to need a beer to forget what I did.",
        next: 2,
        requiredQuestProgress: {
          id: 0,
          step: 1,
        },
        specialResponse: {
          type: SpecialDialogueType.endsQuest,
          id: QuestIds.meatShortage,
        },
      },
      {
        response: 'What is this place?',
        next: 3,
        specialResponse: {
          type: SpecialDialogueType.requiresStat,
          id: PlayerStatIds.goldCoins,
          amount: 20,
          label: 'Gold Coins',
        },
      },
      {
        response: 'Do you have any work for me?',
        next: 4,
        specialResponse: {
          type: SpecialDialogueType.requiresStat,
          id: PlayerStatIds.goldCoins,
          amount: 40,
          label: 'Gold Coins',
        },
      },
      {
        response: 'Do you know anyone who could train me?',
        next: 5,
        specialResponse: {
          type: SpecialDialogueType.requiresStat,
          id: PlayerStatIds.goldCoins,
          amount: 60,
          label: 'Gold Coins',
        },
      },
      {
        response: "That's all for now. Have a good day.",
        next: 2,
        closeDialogue: true,
      },
    ],
  },
  3: {
    message: 'A tavern. Are you blind? That will be 20 coins well spent.',
    options: [{ response: "Well, can't argue with that.", next: 2 }],
  },
  4: {
    message:
      "Yes! All those lazy rats hanging out here made me run out of crab meat. Bring me 50 pieces and I'll give you your money back and toss something extra.",
    options: [
      {
        response: "I'm on it, boss.",
        next: 2,
        nextIfQuestStarted: 7,
        specialResponse: { type: SpecialDialogueType.startsQuest, id: 0 },
      },
      { response: "I think I'll pass. (You will have to pay again if you change your mind)", next: 2 },
    ],
  },
  5: {
    message:
      'I think Marvin specializes in combat training, you could ask him, but he is more gold-hungry than me, so prepare your gold pouch.',
    options: [
      {
        response: "Thanks. I'll look for him.",
        next: 2,
      },
      { response: "More gold hungry than you? I don't think that's possible.", next: 6 },
    ],
  },
  6: { message: 'Hmmph. Go away.', options: [{ response: '...', next: 2, closeDialogue: true }] },
  7: {
    message: 'Nothing new currently. Check again later.',
    options: [
      {
        response: 'Cheers.',
        next: 2,
        closeDialogue: true,
      },
    ],
  },
}

export default LA_HARPAR_BARTENDER
