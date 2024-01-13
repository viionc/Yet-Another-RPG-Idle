import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import ITEM_DATA, {ItemNames} from "../data/itemsData";
import {UnlocksProps, unlock} from "../gameState/storeSlices/playerUnlockedContent";
import {UnlockKey} from "../data/texts/tutorials";

export const checkForUnlocksByZone = (dispatch: Dispatch<UnknownAction>, zoneId: number, currentWave: number) => {
    if (zoneId === 1 && currentWave === 5) dispatch(unlock("towns"));
    if ((zoneId === 1 && currentWave === 10) || (zoneId === 2 && currentWave === 1)) dispatch(unlock("zonesMap"));
};

export const checkForUnlocksByItem = (itemName: ItemNames, unlockedContent: UnlocksProps): UnlockKey | null => {
    const {name} = ITEM_DATA[itemName];
    switch (name) {
        case "Turtle Shell":
            if (!unlockedContent.crafting) return "crafting";
    }
    return null;
};
