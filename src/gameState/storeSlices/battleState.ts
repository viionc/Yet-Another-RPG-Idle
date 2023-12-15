import {SimpleActionProps} from "../store";
import {createAction, createSlice} from "@reduxjs/toolkit";
import ENEMIES_DATA from "../../data/enemiesData";
import ZONES_DATA from "../../data/zonesData";

export type BattleStateProps = {
    battleGlobalCooldown: number;
    battleCurrentCooldown: number;
    isBattleStarted: boolean;
    zoneId: number;
    zoneWaveProgression: Record<number, Record<number, number>>;
    currentWave: number;
    requiredKillsToAdvance: number;
    enemy: BattleStateEnemyProps | null;
    autoWaveProgression: boolean;
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
    change?: true;
    autoWaveProgress?: undefined | number;
};
const resetAction = createAction("RESET_STATES");
const initialState: BattleStateProps = {
    battleGlobalCooldown: 3,
    battleCurrentCooldown: 0,
    zoneId: 0,
    currentWave: 1,
    zoneWaveProgression: {0: {0: 0}},
    requiredKillsToAdvance: 10,
    isBattleStarted: false,
    enemy: null,
    autoWaveProgression: false,
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
            if (action.payload.change) return;
            const currentKillCount = (state.zoneWaveProgression[state.zoneId][state.currentWave] ?? 0) + 1;
            state.zoneWaveProgression[state.zoneId][state.currentWave] = currentKillCount;
            if (
                state.autoWaveProgression &&
                currentKillCount >= state.requiredKillsToAdvance &&
                state.currentWave < ZONES_DATA[state.zoneId].maxWave
            ) {
                state.currentWave++;
                state.zoneWaveProgression[state.zoneId][state.currentWave] = 0;
            }
        },
        changeZone: (state, action: SimpleActionProps) => {
            battleStateSlice.caseReducers.endBattle(state, {type: "battleState/endBattle", payload: {change: true}});
            state.zoneId = action.payload;
            state.currentWave = 1;
        },
        changeWave: (state, action: SimpleActionProps) => {
            battleStateSlice.caseReducers.endBattle(state, {type: "battleState/endBattle", payload: {change: true}});
            state.currentWave = action.payload;
        },
        handleAutoProgression: (state) => {
            state.autoWaveProgression = !state.autoWaveProgression;
        },
    },
    // this causes "Cannot access 'battleStateReducer' before initialization" only in this slice idk why
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export const {startBattle, reduceCooldown, updateEnemyHp, endBattle, changeWave, changeZone, handleAutoProgression} = battleStateSlice.actions;
export default battleStateSlice.reducer;
