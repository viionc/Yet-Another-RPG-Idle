import {SimpleActionProps} from "../store";
import {createAction, createSlice} from "@reduxjs/toolkit";
import ENEMIES_DATA from "../../data/enemiesData";
import ZONES_DATA from "../../data/zonesData";
import {SpellActionProps} from "./playerSpells";

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
    overkillDamage: number;
    damageForHitSplat: string;
    totalEnemyKillCount: Record<number, number>;
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
    overkillDamage?: undefined | number;
};
const resetAction = createAction("RESET_STATES");
const initialState: BattleStateProps = {
    battleGlobalCooldown: 3,
    battleCurrentCooldown: 0,
    zoneId: 0,
    currentWave: 1,
    zoneWaveProgression: {0: {1: 0}}, // {zoneId: {wave: kill count}}
    totalEnemyKillCount: {},
    requiredKillsToAdvance: 10,
    isBattleStarted: false,
    enemy: null,
    autoWaveProgression: false,
    overkillDamage: 0,
    damageForHitSplat: "",
};

export type UpdateEnemyHpProps = {
    hpAfterDamage: number;
    damageForHitSplat: string;
};
export type UpdateEnemyHpAction = {
    payload: UpdateEnemyHpProps;
    type: string;
};

const battleStateSlice = createSlice({
    initialState,
    name: "battleState",
    reducers: {
        startBattle: (state, action: SimpleActionProps) => {
            const enemy = ENEMIES_DATA[action.payload];
            state.isBattleStarted = true;
            const hpBasedOnWave = enemy.maxHp * state.currentWave;
            state.enemy = {id: enemy.id, maxHp: hpBasedOnWave, currentHp: hpBasedOnWave - state.overkillDamage};
            state.overkillDamage = 0;
        },
        reduceCooldowns: (state) => {
            state.battleCurrentCooldown -= 1;
        },
        updateEnemyHp: (state, action: UpdateEnemyHpAction) => {
            if (!state.enemy) return;
            state.enemy.currentHp = action.payload.hpAfterDamage;
            state.damageForHitSplat = action.payload.damageForHitSplat;
        },
        endBattle: (state, action: EndBattleActionProps) => {
            if (!action.payload.change) {
                const currentKc = state.totalEnemyKillCount[(state.enemy as BattleStateEnemyProps).id] ?? 0;
                state.totalEnemyKillCount[(state.enemy as BattleStateEnemyProps).id] = currentKc + 1;
            }
            state.enemy = null;
            state.battleCurrentCooldown = state.battleGlobalCooldown;
            state.isBattleStarted = false;
            if (action.payload.overkillDamage) {
                state.overkillDamage = action.payload.overkillDamage;
            }
            if (action.payload.change) return;
            const currentKillCount = (state.zoneWaveProgression[state.zoneId][state.currentWave] ?? 0) + 1;
            state.zoneWaveProgression[state.zoneId][state.currentWave] = currentKillCount;
            if (state.autoWaveProgression) {
                const maxWave = ZONES_DATA[state.zoneId].maxWave;
                if (currentKillCount >= state.requiredKillsToAdvance && state.currentWave < maxWave) {
                    state.currentWave++;
                    state.zoneWaveProgression[state.zoneId][state.currentWave] = state.zoneWaveProgression[state.zoneId][state.currentWave] ?? 0;
                } else if (state.currentWave === maxWave && currentKillCount >= 1 && ZONES_DATA[state.zoneId + 1]) {
                    state.zoneId++;
                    state.currentWave = 1;
                    if (!state.zoneWaveProgression[state.zoneId]) state.zoneWaveProgression[state.zoneId] = {1: 0};
                    state.zoneWaveProgression[state.zoneId][state.currentWave] = state.zoneWaveProgression[state.zoneId][state.currentWave] ?? 0;
                }
            }
        },
        updateDamageHitSplat: (state, action) => {
            state.damageForHitSplat = action.payload;
        },
        castSpell: (state, action: SpellActionProps) => {
            console.log(state, action.payload);
        },
        changeZone: (state, action: SimpleActionProps) => {
            battleStateSlice.caseReducers.endBattle(state, {type: "battleState/endBattle", payload: {change: true}});
            state.currentWave = action.payload < state.zoneId ? 10 : 1;
            state.zoneId = action.payload;
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

export const {
    startBattle,
    reduceCooldowns,
    updateEnemyHp,
    endBattle,
    changeWave,
    changeZone,
    handleAutoProgression,
    updateDamageHitSplat,
    castSpell,
} = battleStateSlice.actions;
export default battleStateSlice.reducer;
