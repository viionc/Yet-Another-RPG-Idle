import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, increaseStats} from "../gameState/storeSlices/playerStats";
import ENEMIES_DATA, {EnemyProps} from "../data/enemiesData";
import {InventoryItem, addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {PlayerSkillsProps} from "../gameState/storeSlices/playerSkills";

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {playerStats, battleState, playerSkills} = gameState.getState();
    console.log(Date.now());
    const statsToUpdate: IncreaseStatsPayload[] = [];
    const itemsToUpdate: InventoryItem[] = [];

    if (!battleState.isBattleStarted || !battleState.enemy) return;
    const hpAfterDamage = battleState.enemy.currentHp - calculateAttackPower(playerStats.attackPower, playerSkills);
    dispatch(updateEnemyHp(hpAfterDamage));
    if (hpAfterDamage <= 0) {
        dispatch(endBattle());
        const enemy = ENEMIES_DATA[battleState.enemy.id];
        statsToUpdate.push({id: "experience", amount: enemy.experience * battleState.currentWave});
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
