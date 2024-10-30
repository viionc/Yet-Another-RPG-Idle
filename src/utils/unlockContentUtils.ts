import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { UnlocksProps, unlock } from '../store/player-unlocked-content'
import { UnlockKey } from '../data/texts/tutorials'
import { ItemIds } from '../consts/enums/ids/item-ids.enum'
import { ZoneIds } from '../consts/enums/ids/zone-ids.enum'

export const checkForUnlocksByZone = (dispatch: Dispatch<UnknownAction>, zoneId: ZoneIds, currentWave: number) => {
  if (zoneId === 1 && currentWave === 5) dispatch(unlock('towns'))
  if ((zoneId === 1 && currentWave === 10) || (zoneId === ZoneIds.plains && currentWave === 1))
    dispatch(unlock('zonesMap'))
}

export const checkForUnlocksByItem = (id: ItemIds, unlockedContent: UnlocksProps): UnlockKey | null => {
  switch (id) {
    case ItemIds.turtleShell:
      if (!unlockedContent.crafting) return 'crafting'
      break
    default:
    // do nothing
  }
  return null
}
