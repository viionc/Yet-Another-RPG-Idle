import {createAction, createSlice} from "@reduxjs/toolkit";
import {calculateXp} from "../../utils/levelUtils";

export type PlayerStatsProps = {
    mana: number;
    attackPower: number;
    attackSpeed: number;
    experience: number;
    goldCoins: number;
    level: number;
    unspentSkillPoints: number;
};
export type IncreaseStatsAction = {
    payload: IncreaseStatsPayload[];
    type: string;
};

export type IncreaseStatsPayload = {
    id: keyof PlayerStatsProps;
    amount: number;
};
const resetAction = createAction("RESET_STATES");
const initialState: PlayerStatsProps = {
    mana: 0,
    attackPower: 1,
    attackSpeed: 3,
    level: 1,
    experience: 0,
    goldCoins: 0,
    unspentSkillPoints: 0,
};

const checkIfLeveledUp = (state: PlayerStatsProps) => {
    const xpForNextLevel = calculateXp(state.level + 1);
    if (state.experience >= xpForNextLevel) {
        state.level++;
        state.unspentSkillPoints++;
        const leftoverXp = state.experience - xpForNextLevel;
        state.experience = leftoverXp > 0 ? leftoverXp : 0;
    }
};

const playerStatsSlice = createSlice({
    initialState,
    name: "playerStats",
    reducers: {
        increaseStats: (state, action: IncreaseStatsAction) => {
            const {payload} = action;
            for (const stat of payload) {
                state[stat.id] += stat.amount;
                if (stat.id === "experience") {
                    checkIfLeveledUp(state);
                }
            }
        },
        decreaseStats: (state, action: IncreaseStatsAction) => {
            const {payload} = action;
            for (const stat of payload) {
                state[stat.id] -= stat.amount;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export const {increaseStats, decreaseStats} = playerStatsSlice.actions;
export default playerStatsSlice.reducer;
