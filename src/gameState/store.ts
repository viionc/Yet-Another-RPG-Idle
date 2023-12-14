import {combineReducers, configureStore} from "@reduxjs/toolkit";
import playerStatsReducer from "./storeSlices/playerStats";
import battleStateReducer from "./storeSlices/battleState";
import playerInventoryReducer from "./storeSlices/playerInventory";
import playerSkillsReducer from "./storeSlices/playerSkills";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

export type SimpleActionProps = {
    payload: number;
    type: string;
};

const persistConfig = {
    key: "gameState",
    storage,
};

const rootReducer = combineReducers({
    playerStats: playerStatsReducer,
    battleState: battleStateReducer,
    playerInventory: playerInventoryReducer,
    playerSkills: playerSkillsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

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
