import {configureStore} from "@reduxjs/toolkit";
import playerStatsReducer from "./storeSlices/playerStats";
import battleStateReducer from "./storeSlices/battleState";

export const gameState = configureStore({
    reducer: {
        playerStats: playerStatsReducer,
        battleState: battleStateReducer,
    },
});

export type RootState = ReturnType<typeof gameState.getState>;
export type AppDispatch = typeof gameState.dispatch;
