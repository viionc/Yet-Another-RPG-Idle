import { EnemyIds } from '../consts/enums/ids/enemy-ids.enum'
import { ZoneIds } from '../consts/enums/ids/zone-ids.enum'

export type ZoneProps = {
  url: string
  enemies: EnemyIds[]
  maxWave: number
  enemiesPerWave: number
  name: string
  bossEnemyId: EnemyIds
  nextZoneId?: ZoneIds
  previousZoneId?: ZoneIds
  id: ZoneIds
}

const ZONES_DATA: Record<ZoneIds, ZoneProps> = {
  [ZoneIds.horseshoeBeach]: {
    id: ZoneIds.horseshoeBeach,
    name: 'Horseshoe Beach',
    url: './backgrounds/horseshoeBeach.png',
    enemies: [EnemyIds.crab, EnemyIds.seagull, EnemyIds.turtle],
    maxWave: 10,
    enemiesPerWave: 10,
    bossEnemyId: EnemyIds.gangsterCrab,
    nextZoneId: ZoneIds.plains,
  },
  [ZoneIds.tradersBasement]: {
    id: ZoneIds.tradersBasement,
    name: "Trader's Basement",
    url: './backgrounds/tradersBasement.png',
    enemies: [EnemyIds.rat],
    maxWave: 6,
    enemiesPerWave: 10,
    bossEnemyId: EnemyIds.giantRat,
  },
  [ZoneIds.plains]: {
    id: ZoneIds.plains,
    name: 'Plains',
    url: './backgrounds/plains.png',
    enemies: [EnemyIds.blueSlime, EnemyIds.redSlime, EnemyIds.greenSlime],
    maxWave: 10,
    enemiesPerWave: 10,
    bossEnemyId: EnemyIds.kingSlime,
    previousZoneId: ZoneIds.horseshoeBeach,
    nextZoneId: ZoneIds.theLongPath,
  },
  [ZoneIds.theLongPath]: {
    id: ZoneIds.theLongPath,
    name: 'The Long Path',
    url: './backgrounds/theLongPath.png',
    enemies: [EnemyIds.bandit, EnemyIds.deer, EnemyIds.wolf, EnemyIds.goblinScout],
    maxWave: 20,
    enemiesPerWave: 8,
    bossEnemyId: EnemyIds.troll,
    previousZoneId: ZoneIds.plains,
  },
}

export default ZONES_DATA
