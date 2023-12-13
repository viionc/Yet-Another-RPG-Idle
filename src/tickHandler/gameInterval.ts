import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {gameState} from "../gameState/store";
import {reduceCooldown, startBattle} from "../gameState/storeSlices/battleState";

export const gameTickHandler = (dispatch: Dispatch<UnknownAction>) => {
    const {battleState} = gameState.getState();
    if (battleState.battleCurrentCooldown === 0 && !battleState.isBattleStarted) {
        // currently hardcoded 0 for slime id, change later
        dispatch(startBattle(0));
    } else {
        dispatch(reduceCooldown());
    }
};
