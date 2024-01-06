import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, increaseStats} from "../gameState/storeSlices/playerStats";
import ENEMIES_DATA from "../data/enemiesData";
import {addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {
    calculateDamageDone,
    calculateGoldGain,
    calculateEnemyDrops,
    calculateXpGain,
    checkIfWeaponIsBow,
    checkIfOffhandIsArrow,
    handleBowDamage,
} from "../utils/combatUtils";
import {checkForUnlocksByZone} from "../utils/unlockContentUtils";

export type DamageDoneProps = {damage: number; wasCrit: boolean};

let timestmap = Date.now();

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>): number => {
    const {playerStats, battleState, playerEquipment, playerInventory} = gameState.getState();
    const hasBowEquipped = checkIfWeaponIsBow(playerEquipment);
    const arrowNameEquipped = checkIfOffhandIsArrow(playerEquipment);
    console.log("last tick duration: ", Date.now() - timestmap);
    timestmap = Date.now();
    if (!battleState.isBattleStarted || !battleState.enemy) return playerStats.attackSpeed * 1000;

    let damageDone;
    const enemyWeakness = ENEMIES_DATA[battleState.enemy.id].weakness;
    if (hasBowEquipped) {
        damageDone = handleBowDamage({dispatch, arrowNameEquipped, playerInventory, playerStats, enemyWeakness});
        if (!damageDone) {
            dispatch(updateEnemyHp({hpAfterDamage: battleState.enemy.currentHp, damageForHitSplat: `No arrows.`}));
            return playerStats.attackSpeed * 1000;
        }
    } else {
        damageDone = calculateDamageDone({enemyWeakness});
    }

    const hpAfterDamage = battleState.enemy.currentHp - damageDone.damage;
    dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${damageDone.damage}${damageDone.wasCrit ? "!" : ""}`}));
    if (hpAfterDamage <= 0) {
        handleEndBattle(dispatch);
    }

    return playerStats.attackSpeed * 1000;
};

export const handleEndBattle = (dispatch: Dispatch<UnknownAction>) => {
    const {battleState, playerStats} = gameState.getState();
    if (!battleState.enemy) return;
    const statsToUpdate: IncreaseStatsPayload[] = [];
    // let itemsToUpdate: InventoryItem[] = [];
    // fix overkill damage
    // const overkillDamage = playerSkills["Overkill"] ? Math.ceil(Math.abs(hpAfterDamage) / (playerSkills["Overkill"] / 4)) : 0;
    dispatch(endBattle({}));
    const enemy = ENEMIES_DATA[battleState.enemy.id];

    // rework experience formula, for now boosted to *100 for testing
    // rework gold gain, currently boosted for testing
    statsToUpdate.push(
        {
            key: "experience",
            amount: calculateXpGain(playerStats, battleState.zoneId, battleState.currentWave, ENEMIES_DATA[battleState.enemy.id].experience),
        },
        {key: "goldCoins", amount: calculateGoldGain(playerStats, battleState.zoneId, battleState.currentWave)}
    );

    const itemsToUpdate = calculateEnemyDrops(enemy);
    checkForUnlocksByZone(dispatch, battleState.zoneId, battleState.currentWave);
    dispatch(addItemsToInventory(itemsToUpdate));
    dispatch(increaseStats(statsToUpdate));
};
