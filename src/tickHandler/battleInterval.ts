import {gameState} from "../gameState/store";
import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {endBattle, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {IncreaseStatsPayload, increaseStats} from "../gameState/storeSlices/playerStats";

export const battleTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {playerStats, battleState} = gameState.getState();
    const statsToUpdate: IncreaseStatsPayload[] = [];
    if (!battleState.isBattleStarted || !battleState.enemy) return;
    const hpAfterDamage = battleState.enemy.currentHp - playerStats.attackPower;
    dispatch(updateEnemyHp(hpAfterDamage));
    if (hpAfterDamage <= 0) {
        dispatch(endBattle());
        statsToUpdate.push({id: "experience", amount: battleState.enemy.experience});
    }
    dispatch(increaseStats(statsToUpdate));
};
