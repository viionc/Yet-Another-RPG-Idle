import {createSlice} from "@reduxjs/toolkit";

export type PlayerCombatStatsProps = {
    hp: number;
    mana: number;
    attackPower: number;
    attackSpeed: number;
};

const initialState: PlayerCombatStatsProps = {
    hp: 10,
    mana: 0,
    attackPower: 1,
    attackSpeed: 3,
};

const playerCombatStatsSlice = createSlice({
    initialState,
    name: "playerCombatStats",
    reducers: {
        increasePlayerHp: (state) => {
            state.hp += 1;
        },
    },
});

export default playerCombatStatsSlice.reducer;
export const {increasePlayerHp} = playerCombatStatsSlice.actions;
