import { changeWave, changeZone, endBattle } from '.'
import { AppDispatch, GameState } from '..'
import ZONES_DATA from '../../data/zonesData'

export const nextWave = (dispatch: AppDispatch, getState: () => GameState) => {
  const { zoneId, currentWave, zoneWaveProgression } = getState().battleState
  const currentZoneProgression = zoneWaveProgression[zoneId]
  const { maxWave, nextZoneId } = ZONES_DATA[zoneId]

  if (currentWave < maxWave) {
    dispatch(changeWave(currentWave + 1))
  } else if (currentZoneProgression && currentWave === maxWave && currentZoneProgression[maxWave] > 0 && nextZoneId) {
    dispatch(changeZone({ zoneId: nextZoneId, wave: 1 }))
  }

  dispatch(endBattle({ dontCountKillcount: true }))
}

export const previousWave = (dispatch: AppDispatch, getState: () => GameState) => {
  const { zoneId, currentWave } = getState().battleState
  const { previousZoneId, maxWave } = ZONES_DATA[zoneId]

  if (currentWave > 1) {
    dispatch(changeWave(currentWave - 1))
  } else if (previousZoneId) {
    dispatch(changeZone({ zoneId: previousZoneId, wave: maxWave }))
  }

  dispatch(endBattle({ dontCountKillcount: true }))
}
