import { NpcIds } from '../consts/enums/ids/npc-ids.enum'
import LA_HARPAR_BARTENDER from './dialogues/laHarparTown/laHarparBartender'
import LA_HARPAR_ELARA from './dialogues/laHarparTown/laHarparElara'
import LA_HARPAR_JOSH from './dialogues/laHarparTown/laHarparJosh'
import LA_HARPAR_MARVIN from './dialogues/laHarparTown/laHarparMarvin'
import LA_HARPAR_TRADER from './dialogues/laHarparTown/laHarparTrader'
import { DialogueProps } from './dialogues/types'

export type NPCProps = {
  name: string
  url: string
  dialogues: Record<number, DialogueProps>
}

const NPC_Data: Record<NpcIds, NPCProps> = {
  [NpcIds.laHarparBartender]: {
    name: 'Bartender',
    url: './avatars/laHarpar/laHarparBartender.png',
    dialogues: LA_HARPAR_BARTENDER,
  },
  [NpcIds.laHarparJosh]: {
    name: 'Josh',
    url: './avatars/laHarpar/laHarparJosh.png',
    dialogues: LA_HARPAR_JOSH,
  },
  [NpcIds.laHarparTrader]: {
    name: 'Trader',
    url: './avatars/laHarpar/laHarparTrader.png',
    dialogues: LA_HARPAR_TRADER,
  },
  [NpcIds.laHarparElara]: {
    name: 'Elara',
    url: './avatars/laHarpar/laHarparElara.png',
    dialogues: LA_HARPAR_ELARA,
  },
  [NpcIds.laHarparMarvin]: {
    name: 'Marvin',
    url: './avatars/laHarpar/laHarparMarvin.png',
    dialogues: LA_HARPAR_MARVIN,
  },
}
export default NPC_Data
