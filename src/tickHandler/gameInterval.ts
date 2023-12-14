import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {gameState} from "../gameState/store";
import {reduceCooldown, startBattle} from "../gameState/storeSlices/battleState";
import ZONES_DATA from "../data/zonesData";

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {battleState} = gameState.getState();
    if (battleState.battleCurrentCooldown <= 0 && !battleState.isBattleStarted) {
        const currentZoneEnemies = ZONES_DATA[battleState.zoneId].enemies;
        const randomEnemyId = Math.floor(Math.random() * currentZoneEnemies.length);
        dispatch(startBattle(currentZoneEnemies[randomEnemyId]));
    } else {
        dispatch(reduceCooldown());
    }
};
