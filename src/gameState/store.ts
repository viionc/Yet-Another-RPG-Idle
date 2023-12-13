import {configureStore} from "@reduxjs/toolkit";
import playerStatsReducer from "./storeSlices/playerStats";
import battleStateReducer from "./storeSlices/battleState";
import playerInventoryReducer from "./storeSlices/playerInventory";

export const gameState = configureStore({
    reducer: {
        playerStats: playerStatsReducer,
        battleState: battleStateReducer,
        playerInventory: playerInventoryReducer,
    },
});

export type RootState = ReturnType<typeof gameState.getState>;
export type AppDispatch = typeof gameState.dispatch;
