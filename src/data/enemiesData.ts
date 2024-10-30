import { Element } from '../consts/enums/element.enum'
import { EnemyIds } from '../consts/enums/ids/enemy-ids.enum'
import { ItemIds } from '../consts/enums/ids/item-ids.enum'

export type EnemyDrop = {
  id: ItemIds
  minAmount: number
  maxAmount: number
  chance: number
}
export interface EnemyProps {
  maxHp: number
  name: string
  experience: number
  weakness: Element
  drops: EnemyDrop[]
  url: string
  isBossEnemy?: boolean
}

const ENEMIES_DATA: Record<EnemyIds, EnemyProps> = {
  [EnemyIds.greenSlime]: {
    name: 'Green Slime',
    maxHp: 2,
    weakness: Element.fire,
    experience: 5,
    drops: [
      {
        id: ItemIds.slimeResidue,
        minAmount: 1,
        maxAmount: 2,
        chance: 3,
      },
    ],
    url: './enemies/greenSlime.png',
  },
  [EnemyIds.redSlime]: {
    name: 'Red Slime',
    maxHp: 3,
    weakness: Element.water,
    experience: 5,
    drops: [
      {
        id: ItemIds.slimeResidue,
        minAmount: 1,
        maxAmount: 2,
        chance: 3,
      },
    ],
    url: './enemies/redSlime.png',
  },
  [EnemyIds.blueSlime]: {
    name: 'Blue Slime',
    maxHp: 2,
    weakness: Element.air,
    experience: 5,
    drops: [
      {
        id: ItemIds.slimeResidue,
        minAmount: 1,
        maxAmount: 2,
        chance: 3,
      },
    ],
    url: './enemies/blueSlime.png',
  },
  [EnemyIds.kingSlime]: {
    name: 'King Slime',
    maxHp: 100,
    weakness: Element.fire,
    experience: 40,
    drops: [
      {
        id: ItemIds.slimeGoldenCrown,
        minAmount: 1,
        maxAmount: 1,
        chance: 10,
      },
      {
        id: ItemIds.slimeResidue,
        minAmount: 1,
        maxAmount: 10,
        chance: 1,
      },
    ],
    url: './enemies/kingSlime.png',
    isBossEnemy: true,
  },
  [EnemyIds.crab]: {
    name: 'Crab',
    maxHp: 2,
    weakness: Element.physical,
    experience: 5,
    drops: [
      {
        id: ItemIds.crabMeat,
        minAmount: 1,
        maxAmount: 1,
        chance: 2,
      },
      {
        id: ItemIds.stick,
        minAmount: 1,
        maxAmount: 1,
        chance: 4,
      },
    ],
    url: './enemies/crab.png',
  },
  [EnemyIds.seagull]: {
    name: 'Seagull',
    maxHp: 3,
    weakness: Element.physical,
    experience: 8,
    drops: [
      {
        id: ItemIds.feather,
        minAmount: 1,
        maxAmount: 2,
        chance: 2,
      },
      {
        id: ItemIds.stick,
        minAmount: 1,
        maxAmount: 1,
        chance: 4,
      },
    ],
    url: './enemies/seagull.png',
  },
  [EnemyIds.turtle]: {
    name: 'Turtle',
    maxHp: 5,
    weakness: Element.fire,
    experience: 10,
    drops: [
      {
        id: ItemIds.turtleShell,
        minAmount: 1,
        maxAmount: 1,
        chance: 3,
      },
      {
        id: ItemIds.stick,
        minAmount: 1,
        maxAmount: 1,
        chance: 4,
      },
    ],
    url: './enemies/turtle.png',
  },
  [EnemyIds.gangsterCrab]: {
    name: 'Gangster Crab',
    maxHp: 50,
    weakness: Element.physical,
    experience: 50,
    drops: [
      {
        id: ItemIds.knife,
        minAmount: 1,
        maxAmount: 1,
        chance: 10,
      },
      {
        id: ItemIds.crabMeat,
        minAmount: 1,
        maxAmount: 3,
        chance: 1,
      },
    ],
    url: './enemies/gangsterCrab.png',
    isBossEnemy: true,
  },
  [EnemyIds.rat]: {
    name: 'Rat',
    maxHp: 8,
    weakness: Element.fire,
    experience: 11,
    drops: [
      {
        id: ItemIds.ratTail,
        minAmount: 1,
        maxAmount: 1,
        chance: 1,
      },
      {
        id: ItemIds.cheese,
        minAmount: 1,
        maxAmount: 1,
        chance: 8,
      },
    ],
    url: './enemies/rat.png',
  },
  [EnemyIds.giantRat]: {
    name: 'Giant Rat',
    maxHp: 75,
    weakness: Element.fire,
    experience: 100,
    drops: [
      {
        id: ItemIds.ratTail,
        minAmount: 1,
        maxAmount: 1,
        chance: 1,
      },
      {
        id: ItemIds.cheese,
        minAmount: 1,
        maxAmount: 3,
        chance: 2,
      },
      {
        id: ItemIds.ratCatcher,
        minAmount: 1,
        maxAmount: 1,
        chance: 40,
      },
    ],
    url: './enemies/giantRat.png',
    isBossEnemy: true,
  },
  [EnemyIds.wolf]: {
    name: 'Wolf',
    maxHp: 50,
    weakness: Element.fire,
    experience: 30,
    drops: [
      {
        id: ItemIds.wolfFangs,
        minAmount: 1,
        maxAmount: 3,
        chance: 2,
      },
    ],
    url: './enemies/wolf.png',
  },
  [EnemyIds.deer]: {
    name: 'Deer',
    maxHp: 25,
    weakness: Element.fire,
    experience: 20,
    drops: [
      {
        id: ItemIds.deerPelt,
        minAmount: 1,
        maxAmount: 1,
        chance: 4,
      },
    ],
    url: './enemies/deer.png',
  },
  [EnemyIds.bandit]: {
    name: 'Bandit',
    maxHp: 75,
    weakness: Element.air,
    experience: 50,
    drops: [
      {
        id: ItemIds.vialOfWater,
        minAmount: 1,
        maxAmount: 1,
        chance: 6,
      },
      {
        id: ItemIds.trophyNecklace,
        minAmount: 1,
        maxAmount: 1,
        chance: 100,
      },
      {
        id: ItemIds.machete,
        minAmount: 1,
        maxAmount: 1,
        chance: 80,
      },
    ],
    url: './enemies/bandit.png',
  },
  [EnemyIds.goblinScout]: {
    name: 'Goblin Scout',
    maxHp: 30,
    weakness: Element.fire,
    experience: 25,
    drops: [],
    url: './enemies/goblinScout.png',
  },
  [EnemyIds.troll]: {
    name: 'Troll',
    maxHp: 200,
    weakness: Element.water,
    experience: 500,
    drops: [],
    url: './enemies/troll.png',
    isBossEnemy: true,
  },
}

export default ENEMIES_DATA
