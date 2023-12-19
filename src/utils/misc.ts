import {abbreviateNumber} from "js-abbreviation-number";
import {InventoryItem} from "../gameState/storeSlices/playerInventory";
import ITEM_DATA, {ITEM_TIER_VALUE} from "../data/itemsData";

export const short = (number: number) => {
    const symbols = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
    return abbreviateNumber(number, 2, {symbols});
};

export const sortByTier = (array: InventoryItem[]): InventoryItem[] => {
    array.sort((a, b) => {
        const itemA = ITEM_DATA[a.id];
        const itemB = ITEM_DATA[b.id];
        return ITEM_TIER_VALUE[itemB.tier] - ITEM_TIER_VALUE[itemA.tier];
    });
    return array;
};
