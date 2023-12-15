import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {gameState} from "../gameState/store";
import {reduceCooldown, startBattle} from "../gameState/storeSlices/battleState";
import ZONES_DATA from "../data/zonesData";
import {isMaxWave} from "../utils/wavesUtils";

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {battleState} = gameState.getState();
    if (battleState.battleCurrentCooldown <= 0 && !battleState.isBattleStarted) {
        const currentZone = ZONES_DATA[battleState.zoneId];
        if (isMaxWave(battleState.currentWave, currentZone.maxWave)) {
            dispatch(startBattle(currentZone.bossEnemyId));
        } else {
            const randomEnemyId = Math.floor(Math.random() * currentZone.enemies.length);
            dispatch(startBattle(currentZone.enemies[randomEnemyId]));
        }
    } else {
        dispatch(reduceCooldown());
    }
};
