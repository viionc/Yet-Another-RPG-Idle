import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {BattleStateProps, endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, PlayerStatsProps, increaseStats} from "../gameState/storeSlices/playerStats";
import ENEMIES_DATA from "../data/enemiesData";
import {addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {calculateDamageDone, calculateGoldGain, calculateEnemyDrops, calculateXpGain} from "../utils/combatUtils";
import {Unlocks, UnlocksProps, unlock} from "../gameState/storeSlices/unlocks";

export type DamageDoneProps = {damage: number; wasCrit: boolean};

let timestmap = Date.now();

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>): number => {
    const {playerStats, battleState, unlocks} = gameState.getState();
    console.log("last tick duration: ", Date.now() - timestmap);
    timestmap = Date.now();
    if (!battleState.isBattleStarted || !battleState.enemy) return playerStats.attackSpeed * 1000;

    const damageDone = calculateDamageDone(playerStats);
    const hpAfterDamage = battleState.enemy.currentHp - damageDone.damage;
    dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${damageDone.damage}${damageDone.wasCrit ? "!" : ""}`}));
    if (hpAfterDamage <= 0) {
        handleEndBattle(dispatch, battleState, playerStats, unlocks);
    }
    return playerStats.attackSpeed * 1000;
};

export const handleEndBattle = (
    dispatch: Dispatch<UnknownAction>,
    battleState: BattleStateProps,
    playerStats: PlayerStatsProps,
    unlocks: UnlocksProps
) => {
    if (!battleState.enemy) return;
    const statsToUpdate: IncreaseStatsPayload[] = [];
    // let itemsToUpdate: InventoryItem[] = [];
    // fix overkill damage
    //const overkillDamage = playerSkills["Overkill"] ? Math.ceil(Math.abs(hpAfterDamage) / (playerSkills["Overkill"] / 4)) : 0;
    dispatch(endBattle({overkillDamage: 0}));
    const enemy = ENEMIES_DATA[battleState.enemy.id];

    // rework experience formula, for now boosted to *100 for testing
    // rework gold gain, currently boosted for testing
    statsToUpdate.push(
        {
            id: "experience",
            amount: calculateXpGain(playerStats, battleState.zoneId, battleState.currentWave, ENEMIES_DATA[battleState.enemy.id].experience),
        },
        {id: "goldCoins", amount: calculateGoldGain(playerStats, battleState.zoneId, battleState.currentWave)}
    );
    const {itemsToUpdate, unlocksArray} = calculateEnemyDrops(enemy, unlocks);
    unlocksArray.push(...checkForUnlocksByZone(battleState.zoneId, battleState.currentWave));
    dispatch(addItemsToInventory(itemsToUpdate));
    dispatch(increaseStats(statsToUpdate));
    dispatch(unlock(unlocksArray));
};

const checkForUnlocksByZone = (zoneId: number, currentWave: number) => {
    const unlocksArray: Unlocks[] = [];
    if (zoneId === 0 && currentWave === 5) unlocksArray.push("towns");
    return unlocksArray;
};
