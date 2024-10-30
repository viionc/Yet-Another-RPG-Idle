import { createAction, createSlice } from '@reduxjs/toolkit'
import { calculateXp } from '../../utils/levelUtils'
import { reduceCooldowns } from '../battle-state'
import SPELLS_DATA from '../../data/spellsData'
import { buyItems } from '../shops/shops.slice'
import SHOPS_DATA from '../../data/shopsData'
import { castSpell } from '../player-spells'
import { PlayerStatIds } from '../../consts/enums/ids/player-stat-ids'
import { SpellType } from '../../consts/enums/spell-type.enum'

export type PlayerStatsProps = {
  [key in PlayerStatIds]: number
}

export type IncreaseStatsAction = {
  payload: IncreaseStatsPayload[]
  type: string
}

export type IncreaseStatsPayload = {
  id: PlayerStatIds
  amount: number
}

const resetAction = createAction('RESET_STATES')
const initialState: PlayerStatsProps = {
  mana: 5,
  maxMana: 5,
  attackPower: 1,
  attackSpeed: 3,
  critChance: 0,
  critMulti: 2,
  level: 1,
  experience: 0,
  goldCoins: 0,
  unspentSkillPoints: 0,
  goldCoinsMultiplier: 1,
  manaRegenRate: 30,
  currentManaRegenTimer: 30,
  magicDamage: 0,
  cooldownReduction: 0,
  xpMultiplier: 1,
  shopRefreshCooldown: 300,
  currentShopRefreshCooldown: 300,
  arrowRecoveryChance: 0,
  extraFireDamage: 1,
  extraAirDamage: 1,
  extraWaterDamage: 1,
  extraEarthDamage: 1,
  extraLightDamage: 1,
  extraDarkDamage: 1,
  extraPhysicalDamage: 1,
  increasedSpellDuration: 0,
}

const checkIfLeveledUp = (state: PlayerStatsProps) => {
  const xpForNextLevel = calculateXp(state[PlayerStatIds.level] + 1)
  if (state[PlayerStatIds.experience] >= xpForNextLevel) {
    state[PlayerStatIds.level]++
    state[PlayerStatIds.unspentSkillPoints]++
    const leftoverXp = state[PlayerStatIds.experience] - xpForNextLevel
    state[PlayerStatIds.experience] = leftoverXp > 0 ? leftoverXp : 0
    checkIfLeveledUp(state)
  }
}

const playerStatsSlice = createSlice({
  initialState,
  name: 'playerStats',
  reducers: {
    increaseStats: (state, action: IncreaseStatsAction) => {
      const { payload } = action
      for (const stat of payload) {
        state[stat.id] += stat.amount
        if (stat.id === PlayerStatIds.experience) {
          checkIfLeveledUp(state)
        }
      }
    },
    decreaseStats: (state, action: IncreaseStatsAction) => {
      const { payload } = action
      for (const stat of payload) {
        state[stat.id] -= stat.amount
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAction, () => initialState)
      .addCase(castSpell, (state, action) => {
        const { baseManaCost: manaCost, effect } = SPELLS_DATA[action.payload.id]
        state[PlayerStatIds.mana] -= manaCost
        if (effect.type === SpellType.supportBuff) {
          updateStats(state, effect.id, effect.value)
        }
      })
      .addCase(reduceCooldowns, (state) => {
        state[PlayerStatIds.currentManaRegenTimer]--
        state[PlayerStatIds.currentShopRefreshCooldown]--
      })
      .addCase(buyItems, (state, action) => {
        const { shopId, itemId, amount } = action.payload
        const item = SHOPS_DATA[shopId].items.find((item) => item.itemId === itemId)
        if (!item) return

        state[PlayerStatIds.goldCoins] -= amount * item.price
      })
  },
})

const updateStats = (state: PlayerStatsProps, stat: keyof PlayerStatsProps, value: number) => {
  switch (stat) {
    case PlayerStatIds.attackPower:
    case PlayerStatIds.goldCoinsMultiplier:
    case PlayerStatIds.maxMana:
    case PlayerStatIds.cooldownReduction:
    case PlayerStatIds.critChance:
    case PlayerStatIds.critMulti:
    case PlayerStatIds.magicDamage:
    case PlayerStatIds.xpMultiplier:
    case PlayerStatIds.arrowRecoveryChance:
    case PlayerStatIds.increasedSpellDuration:
      state[stat] += value
      break
    case PlayerStatIds.attackSpeed:
    case PlayerStatIds.manaRegenRate:
    case PlayerStatIds.shopRefreshCooldown:
      state[stat] -= value
      break
  }
}

export const { increaseStats, decreaseStats } = playerStatsSlice.actions
export default playerStatsSlice.reducer
