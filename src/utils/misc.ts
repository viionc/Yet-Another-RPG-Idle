import {abbreviateNumber} from "js-abbreviation-number";
import {InventoryItem} from "../gameState/storeSlices/playerInventory";
import ITEM_DATA, {ITEM_TIER_VALUE} from "../data/itemsData";
import {RequirementProps} from "../data/questsData";
import {gameState} from "../gameState/store";

export const short = (number: number) => {
    const symbols = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
    return abbreviateNumber(number, 2, {symbols});
};

export const sortByTier = (array: InventoryItem[]): InventoryItem[] => {
    array.sort((a, b) => {
        const itemA = ITEM_DATA[a.name];
        const itemB = ITEM_DATA[b.name];
        return ITEM_TIER_VALUE[itemB.tier] - ITEM_TIER_VALUE[itemA.tier];
    });
    return array;
};

export const checkIfMeetsRequirements = (requirement: RequirementProps): boolean => {
    const {playerInventory, playerStats, dialogues} = gameState.getState();
    switch (requirement.type) {
        case "item": {
            const item = playerInventory.find((item) => item && item?.name === requirement.name);
            if (!item || item.amount < requirement.amount) return false;
            break;
        }
        case "stat": {
            const stat = playerStats[requirement.key];
            if (!stat || stat < requirement.amount) return false;
            break;
        }
        case "quest": {
            const quest = dialogues.quests[requirement.id];
            if (!quest || (requirement.step && quest < requirement.step)) return false;
        }
    }
    return true;
};
