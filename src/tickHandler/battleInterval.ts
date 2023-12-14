import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, increaseStats} from "../gameState/storeSlices/playerStats";
import ENEMIES_DATA, {EnemyProps} from "../data/enemiesData";
import {InventoryItem, addItemsToInventory} from "../gameState/storeSlices/playerInventory";

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {playerStats, battleState} = gameState.getState();
    const statsToUpdate: IncreaseStatsPayload[] = [];
    const itemsToUpdate: InventoryItem[] = [];
    if (!battleState.isBattleStarted || !battleState.enemy) return;
    const hpAfterDamage = battleState.enemy.currentHp - playerStats.attackPower;
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
            const amount = Math.floor(Math.random() * (drop.maxAmount - drop.minAmount) + drop.maxAmount);
            itemsToUpdate.push({id: drop.id, amount});
        }
    }
};
