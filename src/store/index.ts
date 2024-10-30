import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import playerStatsReducer from './player-stats'
import playerInventoryReducer from './player-inventory'
import playerSkillsReducer from './player-skills'
import battleStateReducer from './battle-state'
import playerSettingsReducer from './player-settings'
import playerEquipmentReducer from './player-equipment'
import playerSpellsReducer from './player-spells'
import dialoguesReducer from './quests-state'
import playerUnlockedContentReducer from './player-unlocked-content'
import shopsReducer from './shops/shops.slice'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

export type SimpleNumberActionProps = {
  payload: number
  type: string
}

const persistConfig = {
  key: 'gameState',
  storage,
  stateReconciler: autoMergeLevel2,
}

export const resetAction = createAction('RESET_STATES')
const rootReducer = combineReducers({
  playerStats: playerStatsReducer,
  playerInventory: playerInventoryReducer,
  playerSkills: playerSkillsReducer,
  battleState: battleStateReducer,
  playerSettings: playerSettingsReducer,
  playerEquipment: playerEquipmentReducer,
  playerSpells: playerSpellsReducer,
  dialogues: dialoguesReducer,
  playerUnlockedContent: playerUnlockedContentReducer,
  shops: shopsReducer,
})

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const gameState = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type GameState = ReturnType<typeof gameState.getState>
export type AppDispatch = typeof gameState.dispatch
export const persistor = persistStore(gameState)
export const thunkDispatch = gameState.dispatch
