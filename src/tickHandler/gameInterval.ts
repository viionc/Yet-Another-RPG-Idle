import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {gameState} from "../gameState/store";
import {reduceCooldowns, startBattle} from "../gameState/storeSlices/battleState";
import ZONES_DATA from "../data/zonesData";
import {isMaxWave} from "../utils/wavesUtils";
import {increaseStats} from "../gameState/storeSlices/playerStats";

// regene mana every 30 seconds, change it later maybe if i add some mana regen boosts
export let manaRegenCooldownTimer = 30;

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {battleState, playerStats} = gameState.getState();
    if (battleState.battleCurrentCooldown <= 0 && !battleState.isBattleStarted) {
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
    manaRegenCooldownTimer--;
    if (manaRegenCooldownTimer === 0) {
        if (playerStats.mana < playerStats.maxMana) dispatch(increaseStats([{id: "mana", amount: 1}]));
        manaRegenCooldownTimer = 30;
    }
};
