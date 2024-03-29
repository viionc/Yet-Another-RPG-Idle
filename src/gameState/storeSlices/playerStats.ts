import {createAction, createSlice} from "@reduxjs/toolkit";
import {calculateXp} from "../../utils/levelUtils";
import {addSkillPoint} from "./playerSkills";
import {equipItem, unequipItem} from "./playerEquipment";
import ITEM_DATA, {ItemProps} from "../../data/itemsData";
import {reduceCooldowns} from "./battleState";
import SPELLS_DATA from "../../data/spellsData";
import {ALL_SKILLS} from "../../data/skillTreesData";
import {buyItems} from "./shops";
import SHOPS_DATA from "../../data/shopsData";
import {castSpell} from "./playerSpells";

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
    manaRegenRate: number;
    currentManaRegenTimer: number;
    magicDamage: number;
    cooldownReduction: number;
    xpMultiplier: number;
    shopRefreshCooldown: number;
    currentShopRefreshCooldown: number;
    arrowRecoveryChance: number;
    extraFireDamage: number;
    extraAirDamage: number;
    extraWaterDamage: number;
    extraEarthDamage: number;
    extraLightDamage: number;
    extraDarkDamage: number;
    extraPhysicalDamage: number;
    increasedSpellDuration: number;
};
export type IncreaseStatsAction = {
    payload: IncreaseStatsPayload[];
    type: string;
};

export type IncreaseStatsPayload = {
    key: keyof PlayerStatsProps;
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
    manaRegenRate: 30,
    currentManaRegenTimer: 30,
    magicDamage: 0,
    cooldownReduction: 0,
    xpMultiplier: 1,
    shopRefreshCooldown: 300,
    currentShopRefreshCooldown: 300,
    arrowRecoveryChance: 0,
    extraFireDamage: 1,
    extraAirDamage: 1,
    extraWaterDamage: 1,
    extraEarthDamage: 1,
    extraLightDamage: 1,
    extraDarkDamage: 1,
    extraPhysicalDamage: 1,
    increasedSpellDuration: 0,
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

const playerStatsSlice = createSlice({
    initialState,
    name: "playerStats",
    reducers: {
        increaseStats: (state, action: IncreaseStatsAction) => {
            const {payload} = action;
            for (const stat of payload) {
                state[stat.key] += stat.amount;
                if (stat.key === "experience") {
                    checkIfLeveledUp(state);
                }
            }
        },
        decreaseStats: (state, action: IncreaseStatsAction) => {
            const {payload} = action;
            for (const stat of payload) {
                state[stat.key] -= stat.amount;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetAction, () => initialState)
            .addCase(addSkillPoint, (state, action) => {
                const {name, amount} = action.payload;
                const skill = ALL_SKILLS.find((skill) => skill.name === name);
                if (!skill || !skill.statEffect) return;
                state.unspentSkillPoints -= amount;
                updateStats(state, skill.statEffect.id, skill.statEffect.value * amount);
            })
            .addCase(equipItem, (state, action) => {
                const item = ITEM_DATA[action.payload] as ItemProps;
                if (item.extra?.type !== "equipment") return;
                item.extra.stats.forEach((stat) => {
                    updateStats(state, stat.key, stat.value);
                });
            })
            .addCase(unequipItem, (state, action) => {
                const item = ITEM_DATA[action.payload] as ItemProps;
                if (item.extra?.type !== "equipment") return;
                item.extra.stats.forEach((stat) => {
                    updateStats(state, stat.key, stat.value * -1);
                });
            })
            .addCase(castSpell, (state, action) => {
                const {baseManaCost: manaCost, effect} = SPELLS_DATA[action.payload.name];
                state.mana -= manaCost;
                if (effect.type === "Support Stat Buff") {
                    updateStats(state, effect.key, effect.value);
                }
            })
            .addCase(reduceCooldowns, (state) => {
                state.currentManaRegenTimer--;
                state.currentShopRefreshCooldown--;
            })
            .addCase(buyItems, (state, action) => {
                const {shopId, name: itemId, amount} = action.payload;
                const item = SHOPS_DATA[shopId].items.find((item) => item.name === itemId);
                if (!item) return;
                state.goldCoins -= amount * item.price;
            });
    },
});

const updateStats = (state: PlayerStatsProps, stat: keyof PlayerStatsProps, value: number) => {
    switch (stat) {
        case "attackPower":
        case "goldCoinsMultiplier":
        case "maxMana":
        case "cooldownReduction":
        case "critChance":
        case "critMulti":
        case "magicDamage":
        case "xpMultiplier":
        case "arrowRecoveryChance":
        case "increasedSpellDuration":
            state[stat] += value;
            break;
        case "attackSpeed":
        case "manaRegenRate":
        case "shopRefreshCooldown":
            state[stat] -= value;
            break;
    }
};

export const {increaseStats, decreaseStats} = playerStatsSlice.actions;
export default playerStatsSlice.reducer;
