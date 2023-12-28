import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import ITEM_DATA from "../data/itemsData";
import {UnlockKey, UnlocksProps, unlock} from "../gameState/storeSlices/playerUnlockedContent";

export const checkForUnlocksByZone = (dispatch: Dispatch<UnknownAction>, zoneId: number, currentWave: number) => {
    if (zoneId === 1 && currentWave === 5) dispatch(unlock("towns"));
    if ((zoneId === 1 && currentWave === 10) || (zoneId === 2 && currentWave === 1)) dispatch(unlock("zonesMap"));
};

export const checkForUnlocksByItem = (id: number, unlockedContent: UnlocksProps): UnlockKey | null => {
    const {name} = ITEM_DATA[id];
    switch (name) {
        case "Turtle Shell":
            if (!unlockedContent.crafting) return "crafting";
    }
    return null;
};
