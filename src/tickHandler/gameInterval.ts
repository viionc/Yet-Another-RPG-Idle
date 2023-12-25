import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {gameState} from "../gameState/store";
import {reduceCooldowns, startBattle} from "../gameState/storeSlices/battleState";
import ZONES_DATA from "../data/zonesData";
import {isMaxWave} from "../utils/wavesUtils";
import {decreaseStats, increaseStats} from "../gameState/storeSlices/playerStats";
import SPELLS_DATA from "../data/spellsData";
import {refreshStock} from "../gameState/storeSlices/shops";

// let timestmap = Date.now();

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {battleState, playerStats, playerSpells} = gameState.getState();
    // console.log("last tick duration: ", Date.now() - timestmap);
    // timestmap = Date.now();
    if (battleState.battleCurrentCooldown <= 1 && !battleState.isBattleStarted) {
        const currentZone = ZONES_DATA[battleState.zoneId];
        if (isMaxWave(battleState.currentWave, currentZone.maxWave)) {
            dispatch(startBattle(currentZone.bossEnemyId));
        } else {
            const randomEnemyId = Math.floor(Math.random() * currentZone.enemies.length);
            dispatch(startBattle(currentZone.enemies[randomEnemyId]));
        }
    } else {
        dispatch(reduceCooldowns());
    }

    playerSpells.spellsQuickBar.forEach((spell) => {
        if (!spell) return;
        if (spell.currentDuration === 1) {
            const effect = SPELLS_DATA[spell.name].effect;
            if (effect.playerStat) {
                const value = effect.playerStat === "attackSpeed" ? (effect.value as number) * -1 : (effect.value as number);
                dispatch(decreaseStats([{id: effect.playerStat, amount: value}]));
            }
        }
    });

    if (playerStats.currentManaRegenTimer <= 1) {
        if (playerStats.mana < playerStats.maxMana) dispatch(increaseStats([{id: "mana", amount: 1}]));
        dispatch(increaseStats([{id: "currentManaRegenTimer", amount: playerStats.manaRegenRate - 1}]));
    }
    if (playerStats.currentShopRefreshCooldown <= 1) {
        dispatch(refreshStock());
        dispatch(increaseStats([{id: "currentShopRefreshCooldown", amount: playerStats.shopRefreshCooldown}]));
    }
};
