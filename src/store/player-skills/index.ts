import { createAction, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { GameState } from '..'
import { SkillIds } from '../../consts/enums/ids/skill-ids.enum'

export type PlayerSkillsProps = Partial<Record<SkillIds, number>>
export type AddSkillPointsAction = {
  payload: AddSkillPointsPayloadProps
  type: string
}

export type AddSkillPointsPayloadProps = {
  id: SkillIds
  amount: number
}

const resetAction = createAction('RESET_STATES')
const initialState: PlayerSkillsProps = {}

export const selectHasSkillUnlocked = (id: SkillIds) => {
  return createDraftSafeSelector(
    (state: GameState) => state.playerSkills,
    (state) => {
      return !!state[id]
    },
  )
}

const playerSkillsSlice = createSlice({
  initialState,
  name: 'playerSkills',
  reducers: {
    addPoint: (state, action: AddSkillPointsAction) => {
      const { id, amount } = action.payload
      state[id] = (state[id] ?? 0) + amount
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAction, () => initialState)
  },
})

export const { addPoint } = playerSkillsSlice.actions
export default playerSkillsSlice.reducer
