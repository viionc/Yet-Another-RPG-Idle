import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {BattleStateProps, endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, PlayerStatsProps, increaseStats} from "../gameState/storeSlices/playerStats";
import ENEMIES_DATA, {EnemyProps} from "../data/enemiesData";
import {InventoryItem, addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {SpellNames} from "../data/spellsData";

export type DamageDoneProps = {damage: number; wasCrit: boolean};

let timestmap = 0;

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {playerStats, battleState} = gameState.getState();
    console.log("last tick duration: ", Date.now() - timestmap);
    timestmap = Date.now();
    if (!battleState.isBattleStarted || !battleState.enemy) return;

    const damageDone = calculateDamageDone(playerStats);
    const hpAfterDamage = battleState.enemy.currentHp - damageDone.damage;
    dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${damageDone.damage}${damageDone.wasCrit ? "!" : ""}`}));
    if (hpAfterDamage <= 0) {
        handleEndBattle(dispatch, battleState, playerStats);
    }
};

export const handleEndBattle = (dispatch: Dispatch<UnknownAction>, battleState: BattleStateProps, playerStats: PlayerStatsProps) => {
    if (!battleState.enemy) return;
    const statsToUpdate: IncreaseStatsPayload[] = [];
    let itemsToUpdate: InventoryItem[] = [];
    // fix overkill damage
    //const overkillDamage = playerSkills["Overkill"] ? Math.ceil(Math.abs(hpAfterDamage) / (playerSkills["Overkill"] / 4)) : 0;
    dispatch(endBattle({overkillDamage: 0}));
    // rework gold gain, currently boosted for testing
    const enemy = ENEMIES_DATA[battleState.enemy.id];

    // rework experience formula, for now boosted to *100 for testing
    statsToUpdate.push(
        {id: "experience", amount: enemy.experience * battleState.currentWave * 100},
        {id: "goldCoins", amount: calculateGoldGain(100, playerStats)}
    );
    itemsToUpdate = calculateEnemyDrops(enemy);
    dispatch(addItemsToInventory(itemsToUpdate));
    dispatch(increaseStats(statsToUpdate));
};

const calculateEnemyDrops = (enemy: EnemyProps) => {
    const itemsToUpdate: InventoryItem[] = [];
    for (const drop of enemy.drops) {
        const roll = Math.ceil(Math.random() * drop.chance);
        if (roll === drop.chance) {
            const amount = Math.floor(Math.random() * (drop.maxAmount - drop.minAmount + 1) + drop.minAmount);
            itemsToUpdate.push({id: drop.id, amount});
        }
    }
    return itemsToUpdate;
};

export const calculateDamageDone = (playerStats: PlayerStatsProps, double?: boolean): DamageDoneProps => {
    const {critChance, critMulti, attackPower} = playerStats;

    let damage = attackPower;
    // for double attack spell
    double ? (damage *= 2) : null;

    let wasCrit = false;
    if (critChance) {
        const critRoll = Math.floor(Math.random() * 100) + 1; // 1 - 100
        // crit chance 2, 1 or 2 will pass
        if (critChance >= critRoll) {
            damage = Math.ceil(damage * critMulti);
            wasCrit = true;
        }
    }
    return {damage, wasCrit};
};

export const calculateGoldGain = (baseGoldEarned: number, playerStats: PlayerStatsProps) => {
    let goldMulti = 0;
    goldMulti += playerStats.goldCoinsMultiplier;
    return baseGoldEarned * goldMulti;
};

export const calculateSpellDamage = (spellName: SpellNames, playerStats: PlayerStatsProps): DamageDoneProps => {
    // makeshift solution for now, rework later
    let damageDone = {damage: 0, wasCrit: false};
    switch (spellName) {
        case "Double Attack":
            damageDone = calculateDamageDone(playerStats, true);
            break;
        case "Fire Strike":
            damageDone.damage = 8;
            break;
    }
    return damageDone;
};
