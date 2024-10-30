import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { GameState } from '..'
import { ZoneIds } from '../../consts/enums/ids/zone-ids.enum'

const selectSelf = (state: GameState) => state.battleState

export const selectZoneProgression = (id: ZoneIds) => {
  return createDraftSafeSelector(selectSelf, (state) => {
    return state.zoneWaveProgression[id]
  })
}
