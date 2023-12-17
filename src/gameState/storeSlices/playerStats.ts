import {createAction, createSlice} from "@reduxjs/toolkit";
import {calculateXp} from "../../utils/levelUtils";
import {addSkillPoint} from "./playerSkills";
import {equipItem, unequipItem} from "./playerEquipment";
import ITEM_DATA from "../../data/itemsData";
import {castSpell} from "./battleState";
import SPELLS_DATA from "../../data/spellsData";

export type PlayerStatsProps = {
    mana: number;
    maxMana: number;
    attackPower: number;
    attackSpeed: number;
    critChance: number;
    critMulti: number;
    experience: number;
    goldCoins: number;
    level: number;
    unspentSkillPoints: number;
    goldCoinsMultiplier: number;
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
    mana: 5,
    maxMana: 5,
    attackPower: 1,
    attackSpeed: 3,
    critChance: 0,
    critMulti: 2,
    level: 1,
    experience: 0,
    goldCoins: 0,
    unspentSkillPoints: 0,
    goldCoinsMultiplier: 1,
};

const checkIfLeveledUp = (state: PlayerStatsProps) => {
    const xpForNextLevel = calculateXp(state.level + 1);
    if (state.experience >= xpForNextLevel) {
        state.level++;
        state.unspentSkillPoints++;
        const leftoverXp = state.experience - xpForNextLevel;
        state.experience = leftoverXp > 0 ? leftoverXp : 0;
        checkIfLeveledUp(state);
    }
};

// const updateStats = (state, stat: keyof PlayerStatsProps)=> {
//     switch (stat) {
//         case "Attack Power":
//             state.attackPower++;
//             break;
//         case "Attack Speed":
//             state.attackSpeed -= 0.2;
//             break;
//         case "Crit Chance":
//             state.critChance += 2;
//             break;
//         case "Crit Multi":
//             state.critMulti += 0.1;
//             break;
//     }
// }

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
        builder
            .addCase(resetAction, () => initialState)
            .addCase(addSkillPoint, (state, action) => {
                switch (action.payload) {
                    case "Attack Power":
                        state.attackPower++;
                        break;
                    case "Attack Speed":
                        state.attackSpeed -= 0.2;
                        break;
                    case "Crit Chance":
                        state.critChance += 2;
                        break;
                    case "Crit Multi":
                        state.critMulti += 0.1;
                        break;
                }
            })
            .addCase(equipItem, (state, action) => {
                const equipment = ITEM_DATA[action.payload].equipment;
                if (!equipment) return;
                equipment.stats.forEach((stat) => {
                    switch (stat.type) {
                        case "attackPower":
                            state.attackPower += stat.value;
                            break;
                        case "attackSpeed":
                            state.attackSpeed -= stat.value;
                            break;
                        case "goldCoinsMultiplier":
                            state.goldCoinsMultiplier += stat.value;
                            break;
                    }
                });
            })
            .addCase(unequipItem, (state, action) => {
                const equipment = ITEM_DATA[action.payload].equipment;
                if (!equipment) return;
                equipment.stats.forEach((stat) => {
                    switch (stat.type) {
                        case "attackPower":
                            state.attackPower -= stat.value;
                            break;
                        case "attackSpeed":
                            state.attackSpeed += stat.value;
                            break;
                    }
                });
            })
            .addCase(castSpell, (state, action) => {
                const spell = SPELLS_DATA[action.payload];
                state.mana -= spell.manaCost;
            });
    },
});

export const {increaseStats, decreaseStats} = playerStatsSlice.actions;
export default playerStatsSlice.reducer;
