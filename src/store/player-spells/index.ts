import { createAction, createSlice } from '@reduxjs/toolkit'
import { reduceCooldowns } from '../battle-state'
import { SpellIds } from '../../consts/enums/ids/spell-ids.enum'

export type SpellActionProps = {
  payload: SpellPayloadProps
  type: string
}

export type UnlockSpellActionProps = {
  payload: {
    id: SpellIds
  }
  type: string
}

export type SpellPayloadProps = {
  id: SpellIds
  cooldown: number
  duration?: number
}

export type ActiveSpellProps = {
  id: SpellIds
  currentDuration: number
}

export type PlayerSpellsProps = {
  spellsUnlocked: Partial<Record<SpellIds, boolean>>
  spellsQuickBar: Array<QuickBarSpellProps | null>
  activeSpells: ActiveSpellProps[]
}

export type QuickBarSpellProps = {
  id: SpellIds
  cooldown: number
  currentCooldown: number
  duration?: number
}

const resetAction = createAction('RESET_STATES')
const initialState: PlayerSpellsProps = {
  spellsUnlocked: {},
  spellsQuickBar: new Array(10).fill(null),
  activeSpells: [],
}

const playerSpellsSlice = createSlice({
  initialState,
  name: 'playerSpells',
  reducers: {
    unlockSpell: (state, action: UnlockSpellActionProps) => {
      // unlocked spells flag
      state.spellsUnlocked[action.payload.id] = true
    },
    addToQuickBar: (state, action: SpellActionProps) => {
      // adds newly unlocked (or later player chosen) spell to quickbar
      // for now it just looks for an empty slot in spell quickbar
      const freeSlotIndex = state.spellsQuickBar.findIndex((slot) => slot === null)
      const { id, cooldown, duration } = action.payload
      const spell: QuickBarSpellProps = { id, currentCooldown: 0, cooldown }
      if (duration) spell.duration = duration

      state.spellsQuickBar[freeSlotIndex] = spell
    },
    castSpell: (state, action: SpellActionProps) => {
      const { cooldown, duration, id } = action.payload
      const index = state.spellsQuickBar.findIndex((spell) => spell?.id === id)
      const spell = state.spellsQuickBar[index]
      if (index === -1 || !spell) return

      spell.currentCooldown = cooldown

      // if there was a duration property in payload that means it was a buff spell
      // add it to active spells (buffs)
      if (duration) {
        state.activeSpells.push({ id, currentDuration: duration })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAction, () => initialState)
      .addCase(reduceCooldowns, (state) => {
        // reduce cooldowns and durations
        state.spellsQuickBar.forEach((spell) => {
          if (spell?.currentCooldown) spell.currentCooldown--
        })

        state.activeSpells.forEach((spell) => {
          spell.currentDuration--
        })

        // filter out spells that duration reached 0
        state.activeSpells = state.activeSpells.filter((spell) => spell.currentDuration > 0)
      })
  },
})

export default playerSpellsSlice.reducer
export const { castSpell, unlockSpell, addToQuickBar } = playerSpellsSlice.actions
