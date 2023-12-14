import {createSlice} from "@reduxjs/toolkit";
import ENEMIES_DATA from "../../data/enemiesData";
import ZONES_DATA from "../../data/zonesData";

export type BattleStateProps = {
    battleGlobalCooldown: number;
    battleCurrentCooldown: number;
    isBattleStarted: boolean;
    zoneId: number;
    currentWave: number;
    requiredKillsToAdvance: number;
    currentKillCount: number;
    enemy: BattleStateEnemyProps | null;
};

export interface BattleStateEnemyProps {
    maxHp: number;
    id: number;
    currentHp: number;
}

type BattleStateStartAction = {
    payload: number;
    type: string;
};

const initialState: BattleStateProps = {
    battleGlobalCooldown: 3,
    battleCurrentCooldown: 0,
    zoneId: 0,
    currentWave: 1,
    requiredKillsToAdvance: 10,
    currentKillCount: 0,
    isBattleStarted: false,
    enemy: null,
};

const battleStateSlice = createSlice({
    initialState,
    name: "battleState",
    reducers: {
        startBattle: (state, action: BattleStateStartAction) => {
            const enemy = ENEMIES_DATA[action.payload];
            state.isBattleStarted = true;
            const hpBasedOnWave = enemy.maxHp * state.currentWave;
            state.enemy = {id: enemy.id, maxHp: hpBasedOnWave, currentHp: hpBasedOnWave};
        },
        reduceCooldown: (state) => {
            state.battleCurrentCooldown -= 1;
        },
        updateEnemyHp: (state, action: BattleStateStartAction) => {
            if (!state.enemy) return;
            state.enemy.currentHp = action.payload;
        },

        endBattle: (state) => {
            state.enemy = null;
            state.battleCurrentCooldown = state.battleGlobalCooldown;
            state.isBattleStarted = false;
            state.currentKillCount++;
            if (state.currentKillCount === state.requiredKillsToAdvance && state.currentWave < ZONES_DATA[state.zoneId].maxWave) {
                state.currentWave++;
                state.currentKillCount = 0;
            }
        },
        changeZone: (state, action: BattleStateStartAction) => {
            battleStateSlice.caseReducers.endBattle(state);
            state.zoneId = action.payload;
            state.currentKillCount = 0;
            state.currentWave = 1;
        },
        changeWave: (state, action: BattleStateStartAction) => {
            battleStateSlice.caseReducers.endBattle(state);
            state.currentWave = action.payload;
            state.currentKillCount = 0;
        },
    },
});

export default battleStateSlice.reducer;
export const {startBattle, reduceCooldown, updateEnemyHp, endBattle} = battleStateSlice.actions;
