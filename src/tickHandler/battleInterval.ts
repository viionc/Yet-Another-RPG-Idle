import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, PlayerStatsProps, increaseStats} from "../gameState/storeSlices/playerStats";
import ENEMIES_DATA, {EnemyProps} from "../data/enemiesData";
import {InventoryItem, addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {PlayerSkillsProps} from "../gameState/storeSlices/playerSkills";

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {playerStats, battleState, playerSkills} = gameState.getState();
    console.log(Date.now());
    const statsToUpdate: IncreaseStatsPayload[] = [];
    const itemsToUpdate: InventoryItem[] = [];

    if (!battleState.isBattleStarted || !battleState.enemy) return;
    const damageDone = calculateDamageDone(playerStats);
    const hpAfterDamage = battleState.enemy.currentHp - damageDone.damage;
    dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${damageDone.damage}${damageDone.wasCrit ? "!" : ""}`}));
    if (hpAfterDamage <= 0) {
        // fix overkill damage
        //const overkillDamage = playerSkills["Overkill"] ? Math.ceil(Math.abs(hpAfterDamage) / (playerSkills["Overkill"] / 4)) : 0;
        dispatch(endBattle({autoWaveProgress: playerSkills["Auto Wave Progress"], overkillDamage: 0}));
        const enemy = ENEMIES_DATA[battleState.enemy.id];
        statsToUpdate.push({id: "experience", amount: enemy.experience * battleState.currentWave * 100});
        calculateEnemyDrops(enemy, itemsToUpdate);
    }

    dispatch(addItemsToInventory(itemsToUpdate));
    dispatch(increaseStats(statsToUpdate));
};

const calculateEnemyDrops = (enemy: EnemyProps, itemsToUpdate: InventoryItem[]) => {
    for (const drop of enemy.drops) {
        const roll = Math.ceil(Math.random() * drop.chance);
        if (roll === drop.chance) {
            const amount = Math.floor(Math.random() * (drop.maxAmount - drop.minAmount + 1) + drop.minAmount);
            itemsToUpdate.push({id: drop.id, amount});
        }
    }
};

export const calculateAttackPower = (attackPower: number, playerSkills: PlayerSkillsProps): number => {
    const attackPowerSkill = playerSkills["Attack Power"] ?? 0;
    return attackPower + attackPowerSkill;
};

export const calculateAttackSpeed = (attackSpeed: number, playerSkills: PlayerSkillsProps): number => {
    const attackSpeedSkill = playerSkills["Attack Speed"] ?? 0;
    return attackSpeed - attackSpeedSkill * 0.2;
};

export const calculateDamageDone = (playerStats: PlayerStatsProps): {damage: number; wasCrit: boolean} => {
    const {critChance, critMulti, attackPower} = playerStats;

    let damage = attackPower;
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
