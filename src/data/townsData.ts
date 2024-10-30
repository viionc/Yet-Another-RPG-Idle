import { NpcIds } from '../consts/enums/ids/npc-ids.enum'
import { QuestIds } from '../consts/enums/ids/quest-ids.enum'
import { TownIds } from '../consts/enums/ids/town-ids.enum'
import { TownObjectIds } from '../consts/enums/ids/town-object-ids.enum'
import { ZoneIds } from '../consts/enums/ids/zone-ids.enum'
import { RequirementType } from '../consts/enums/requirement-type.enum'
import { RequirementProps } from './questsData'

export type TownTabs = 'Main' | 'Tavern' | 'Shop' | 'Exploration Guild' | 'Market'
export type Regions = 'Southback' | 'Port Stocksmar' | 'Greefic Hill' | 'Saint Nestroud'

export interface TownProps {
  name: string
  region: Regions
  url: string
  buildings: TownBuildingProps[]
}

export interface TownTabNpcProps {
  id: NpcIds
  position: string
}

export interface TownBuildingProps {
  name: TownTabs
  npcIds: TownTabNpcProps[]
  objectsIds?: TownBuildingObjectProps[]
  url: string
}

export type TownBuildingObjectProps = EntraceObject | TaskBoardObject

interface TownObject {
  url: string
  position: string
  name: string
}

interface EntraceObject extends TownObject {
  type: TownObjectIds.zoneEntrance
  zoneId: ZoneIds
  requirement: RequirementProps
}

interface TaskBoardObject extends TownObject {
  type: TownObjectIds.taskBoard
}

const TOWNS_DATA: Record<TownIds, TownProps> = {
  [TownIds.laHarpar]: {
    name: 'La Harpar',
    region: 'Port Stocksmar',
    url: './backgrounds/laHarpar.png',
    buildings: [
      {
        name: 'Tavern',
        npcIds: [
          { id: NpcIds.laHarparBartender, position: 'top-1/2 -translate-y-1/2 right-5 ' },
          { id: NpcIds.laHarparJosh, position: 'top-1/2 -translate-y-3/4 left-5' },
        ],
        url: './backgrounds/laHarparTavern.png',
      },
      {
        name: 'Market',
        objectsIds: [
          {
            name: "Trader's Basement",
            type: TownObjectIds.zoneEntrance,
            zoneId: ZoneIds.tradersBasement,
            requirement: {
              type: RequirementType.quest,
              id: QuestIds.ratsWereRats,
              step: 0,
            },
            position: 'top-1/2 left-[19%] -translate-y-1/2',
            url: './objects/basementDoor.png',
          },
        ],
        npcIds: [
          {
            id: NpcIds.laHarparTrader,
            position: 'top-1/2 left-1/3 -translate-y-1/2',
          },
          {
            id: NpcIds.laHarparElara,
            position: 'top-2/3 left-2/3 -translate-y-1/2',
          },
        ],
        url: './backgrounds/laHarparMarket.png',
      },
      {
        name: 'Shop',
        npcIds: [
          {
            id: NpcIds.laHarparTrader,
            position: '',
          },
        ],
        url: './backgrounds/laHarparShop.png',
      },
      {
        name: 'Exploration Guild',
        npcIds: [
          {
            id: NpcIds.laHarparMarvin,
            position: 'top-2/3 left-2/3 -translate-y-1/2',
          },
        ],
        objectsIds: [
          {
            name: 'Task Board',
            type: TownObjectIds.taskBoard,
            position: 'top-1/2 left-[19%] -translate-y-1/2',
            url: './objects/taskBoard.png',
          },
        ],
        url: '',
      },
    ],
  },
}

export default TOWNS_DATA
