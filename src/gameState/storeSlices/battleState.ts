import {createSlice} from "@reduxjs/toolkit";
import ENEMIES_DATA, {EnemyProps} from "../../data/enemiesData";

export type BattleStateProps = {
    battleGlobalCooldown: number;
    battleCurrentCooldown: number;
    isBattleStarted: boolean;
    enemy: BattleStateEnemyProps | null;
};

export interface BattleStateEnemyProps extends EnemyProps {
    currentHp: number;
}

type BattleStateStartAction = {
    payload: number;
    type: string;
};

const initialState: BattleStateProps = {
    battleGlobalCooldown: 3,
    battleCurrentCooldown: 0,
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
            state.enemy = {...enemy, currentHp: enemy.maxHp};
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
        },
    },
});

export default battleStateSlice.reducer;
export const {startBattle, reduceCooldown, updateEnemyHp, endBattle} = battleStateSlice.actions;
