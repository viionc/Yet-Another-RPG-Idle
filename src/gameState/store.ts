import {configureStore} from "@reduxjs/toolkit";
import playerCombatStatsReducer from "./storeSlices/playerCombatStats";

export const gameState = configureStore({
    reducer: {
        playerCombatStats: playerCombatStatsReducer,
    },
});

export type RootState = ReturnType<typeof gameState.getState>;
export type AppDispatch = typeof gameState.dispatch;
