import {createSlice} from "@reduxjs/toolkit";
import ENEMIES_DATA from "../../data/enemiesData";
import ZONES_DATA from "../../data/zonesData";
import {SimpleActionProps, resetAction} from "../store";

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
export type EndBattleActionProps = {
    payload: EndBattlePropsProps;
    type: string;
};
export type EndBattlePropsProps = {
    autoWaveProgress?: undefined | number;
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
        startBattle: (state, action: SimpleActionProps) => {
            const enemy = ENEMIES_DATA[action.payload];
            state.isBattleStarted = true;
            const hpBasedOnWave = enemy.maxHp * state.currentWave;
            state.enemy = {id: enemy.id, maxHp: hpBasedOnWave, currentHp: hpBasedOnWave};
        },
        reduceCooldown: (state) => {
            state.battleCurrentCooldown -= 1;
        },
        updateEnemyHp: (state, action: SimpleActionProps) => {
            if (!state.enemy) return;
            state.enemy.currentHp = action.payload;
        },
        endBattle: (state, action: EndBattleActionProps) => {
            state.enemy = null;
            state.battleCurrentCooldown = state.battleGlobalCooldown;
            state.isBattleStarted = false;
            state.currentKillCount++;
            if (!action) return;
            if (
                action.payload.autoWaveProgress &&
                state.currentKillCount >= state.requiredKillsToAdvance &&
                state.currentWave < ZONES_DATA[state.zoneId].maxWave
            ) {
                state.currentWave++;
                state.currentKillCount = 0;
            }
        },
        changeZone: (state, action: SimpleActionProps) => {
            battleStateSlice.caseReducers.endBattle(state, {type: "battleState/endBattle", payload: {}});
            state.zoneId = action.payload;
            state.currentKillCount = 0;
            state.currentWave = 1;
        },
        changeWave: (state, action: SimpleActionProps) => {
            battleStateSlice.caseReducers.endBattle(state, {type: "battleState/endBattle", payload: {}});
            state.currentWave = action.payload;
            state.currentKillCount = 0;
        },
    },
    // this causes "Cannot access 'battleStateReducer' before initialization" only in this slice idk why
    // extraReducers: (builder) => {
    //     builder.addCase(resetAction, () => initialState);
    // },
});

export default battleStateSlice.reducer;
export const {startBattle, reduceCooldown, updateEnemyHp, endBattle, changeWave, changeZone} = battleStateSlice.actions;
