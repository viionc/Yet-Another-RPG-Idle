import {combineReducers, configureStore, createAction} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import playerStatsReducer from "./storeSlices/playerStats";
import playerInventoryReducer from "./storeSlices/playerInventory";
import playerSkillsReducer from "./storeSlices/playerSkills";
import battleStateReducer from "./storeSlices/battleState";
import playerSettingsReducer from "./storeSlices/playerSettings";
import playerEquipmentReducer from "./storeSlices/playerEquipment";
import playerSpellsReducer from "./storeSlices/playerSpells";
import dialoguesReducer from "./storeSlices/dialogues";
import unlocksReducer from "./storeSlices/unlocks";
import shopsReducer from "./storeSlices/shops";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export type SimpleActionProps = {
    payload: number;
    type: string;
};

const persistConfig = {
    key: "gameState",
    storage,
    stateReconciler: autoMergeLevel2,
};

export const resetAction = createAction("RESET_STATES");
const rootReducer = combineReducers({
    playerStats: playerStatsReducer,
    playerInventory: playerInventoryReducer,
    playerSkills: playerSkillsReducer,
    battleState: battleStateReducer,
    playerSettings: playerSettingsReducer,
    playerEquipment: playerEquipmentReducer,
    playerSpells: playerSpellsReducer,
    dialogues: dialoguesReducer,
    unlocks: unlocksReducer,
    shops: shopsReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const gameState = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof gameState.getState>;
export type AppDispatch = typeof gameState.dispatch;
export const persistor = persistStore(gameState);
