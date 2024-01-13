import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {gameState} from "../gameState/store";
import {reduceCooldowns, startBattle} from "../gameState/storeSlices/battleState";
import ZONES_DATA from "../data/zonesData";
import {isMaxWave} from "../utils/wavesUtils";
import {decreaseStats, increaseStats} from "../gameState/storeSlices/playerStats";
import SPELLS_DATA, {SpellSupportStatBuffEffectProps} from "../data/spellsData";
import {refreshStock} from "../gameState/storeSlices/shops";

let timestmap = Date.now();

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(reduceCooldowns());

    const {battleState, playerStats, playerSpells} = gameState.getState();
    console.log("last tick duration: ", Date.now() - timestmap);
    timestmap = Date.now();

    if (battleState.battleCurrentCooldown <= 0 && !battleState.isBattleStarted) {
        const currentZone = ZONES_DATA[battleState.zoneId];
        // if currently player is on last wave of the zone choose boss as an enemy
        if (isMaxWave(battleState.currentWave, currentZone.maxWave)) {
            dispatch(startBattle(currentZone.bossEnemyId));
        } else {
            const randomEnemyId = Math.floor(Math.random() * currentZone.enemies.length);
            dispatch(startBattle(currentZone.enemies[randomEnemyId]));
        }
    }

    // reduce active spell durations
    playerSpells.activeSpells.forEach((spell) => {
        if (spell.currentDuration > 1) return;
        const effect = SPELLS_DATA[spell.name].effect as SpellSupportStatBuffEffectProps;
        const value = effect.key === "attackSpeed" ? effect.value * -1 : effect.value;
        dispatch(decreaseStats([{key: effect.key, amount: value}]));
    });

    // mana regen timer, if 1 or below increase current mana by 1
    if (playerStats.currentManaRegenTimer <= 0) {
        if (playerStats.mana < playerStats.maxMana) dispatch(increaseStats([{key: "mana", amount: 1}]));
        dispatch(increaseStats([{key: "currentManaRegenTimer", amount: playerStats.manaRegenRate}]));
    }

    if (playerStats.currentShopRefreshCooldown <= 0) {
        dispatch(refreshStock());
        dispatch(increaseStats([{key: "currentShopRefreshCooldown", amount: playerStats.shopRefreshCooldown}]));
    }
};
