import { createAction, createSlice } from '@reduxjs/toolkit'
import ENEMIES_DATA from '../../data/enemiesData'
import ZONES_DATA from '../../data/zonesData'
import { SimpleNumberActionProps } from '..'
import { EnemyIds } from '../../consts/enums/ids/enemy-ids.enum'
import { ZoneIds } from '../../consts/enums/ids/zone-ids.enum'

export type BattleStateProps = {
  battleGlobalCooldown: number
  battleCurrentCooldown: number
  isBattleStarted: boolean
  zoneId: ZoneIds
  zoneWaveProgression: Partial<Record<ZoneIds, Record<number, number>>>
  currentWave: number
  enemy: BattleStateEnemyProps | null
  autoWaveProgression: boolean
  overkillDamage: number
  damageForHitSplat: string
  totalEnemyKillCount: Partial<Record<EnemyIds, number>>
}

export interface BattleStateEnemyProps {
  maxHp: number
  id: EnemyIds
  currentHp: number
}

export type EndBattleActionProps = {
  payload: EndBattlePropsProps
  type: string
}

export type EndBattlePropsProps = {
  dontCountKillcount?: true
  overkillDamage?: undefined | number
}

export type UpdateEnemyHpProps = {
  hpAfterDamage: number
  damageForHitSplat: string
}
export type UpdateEnemyHpAction = {
  payload: UpdateEnemyHpProps
  type: string
}

export type ChangeZoneActionProps = {
  payload: ChangeZonePayloadProps
  type: string
}

export type ChangeZonePayloadProps = {
  zoneId: ZoneIds
  wave: number
}

export type StartBattleAction = {
  payload: {
    id: EnemyIds
  }
  type: string
}

const resetAction = createAction('RESET_STATES')
const initialState: BattleStateProps = {
  battleGlobalCooldown: 3,
  battleCurrentCooldown: 0,
  zoneId: ZoneIds.horseshoeBeach,
  currentWave: 1,
  zoneWaveProgression: { [ZoneIds.horseshoeBeach]: { 1: 0 } }, // {zoneId: {wave: kill count}}
  totalEnemyKillCount: {},
  isBattleStarted: false,
  enemy: null,
  autoWaveProgression: false,
  overkillDamage: 0,
  damageForHitSplat: '',
}

const battleStateSlice = createSlice({
  initialState,
  name: 'battleState',
  reducers: {
    startBattle: (state, action: StartBattleAction) => {
      const enemy = ENEMIES_DATA[action.payload.id]
      state.isBattleStarted = true
      const hpBasedOnWave = enemy.maxHp * state.currentWave
      state.enemy = { id: action.payload.id, maxHp: hpBasedOnWave, currentHp: hpBasedOnWave - state.overkillDamage }
      state.overkillDamage = 0
    },
    reduceCooldowns: (state) => {
      state.battleCurrentCooldown -= 1
    },
    updateEnemyHp: (state, action: UpdateEnemyHpAction) => {
      if (!state.enemy) return
      state.enemy.currentHp = action.payload.hpAfterDamage
      state.damageForHitSplat = action.payload.damageForHitSplat
    },
    endBattle: (state, action: EndBattleActionProps) => {
      if (!action.payload.dontCountKillcount) {
        const currentKc = state.totalEnemyKillCount[(state.enemy as BattleStateEnemyProps).id] ?? 0
        state.totalEnemyKillCount[(state.enemy as BattleStateEnemyProps).id] = currentKc + 1
      }
      state.enemy = null
      state.battleCurrentCooldown = state.battleGlobalCooldown
      state.isBattleStarted = false
      if (action.payload.overkillDamage) {
        state.overkillDamage = action.payload.overkillDamage
      }
      if (action.payload.dontCountKillcount) return
      const currentZoneProgression = state.zoneWaveProgression[state.zoneId] || {}
      const currentKillCount = (currentZoneProgression[state.currentWave] ?? 0) + 1
      currentZoneProgression[state.currentWave] = currentKillCount
      state.zoneWaveProgression[state.zoneId] = currentZoneProgression

      if (!state.autoWaveProgression) return

      const { maxWave, nextZoneId, enemiesPerWave } = ZONES_DATA[state.zoneId]

      if (currentKillCount >= enemiesPerWave && state.currentWave < maxWave) {
        state.currentWave++
        currentZoneProgression[state.currentWave] = currentZoneProgression[state.currentWave] ?? 0
      } else if (state.currentWave === maxWave && currentKillCount >= 1 && nextZoneId) {
        state.zoneId = nextZoneId
        state.currentWave = 1
        if (!state.zoneWaveProgression[state.zoneId]) state.zoneWaveProgression[state.zoneId] = { 1: 0 }
        currentZoneProgression[state.currentWave] = currentZoneProgression[state.currentWave] ?? 0
      }

      state.zoneWaveProgression[state.zoneId] = currentZoneProgression
    },
    updateDamageHitSplat: (state, action) => {
      state.damageForHitSplat = action.payload
    },
    changeZone: (state, action: ChangeZoneActionProps) => {
      const { zoneId, wave } = action.payload
      if (!state.zoneWaveProgression[zoneId]) state.zoneWaveProgression[zoneId] = { 1: 0 }
      state.currentWave = wave
      state.zoneId = zoneId
    },
    changeWave: (state, action: SimpleNumberActionProps) => {
      state.currentWave = action.payload
    },
    handleAutoProgression: (state) => {
      state.autoWaveProgression = !state.autoWaveProgression
    },
  },
  // this causes "Cannot access 'battleStateReducer' before initialization" only in this slice idk why
  extraReducers: (builder) => {
    builder.addCase(resetAction, () => initialState)
  },
})

export const {
  startBattle,
  reduceCooldowns,
  updateEnemyHp,
  endBattle,
  changeWave,
  changeZone,
  handleAutoProgression,
  updateDamageHitSplat,
} = battleStateSlice.actions
export default battleStateSlice.reducer
