import {UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {RequiredQuestProgressProps} from "../data/dialogues/types";
import QUEST_DATA from "../data/questsData";
import {removeItemsFromInventory, InventoryItem, addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {decreaseStats, IncreaseStatsPayload, increaseStats} from "../gameState/storeSlices/playerStats";
import {gameState} from "../gameState/store";

export const handleProceedQuest = (dispatch: Dispatch<UnknownAction>, requiredQuestProgress: RequiredQuestProgressProps) => {
    const {id, step} = requiredQuestProgress;
    const {requirement} = QUEST_DATA[id].steps[step];
    switch (requirement.type) {
        case "item": {
            dispatch(removeItemsFromInventory([{name: requirement.name, amount: requirement.amount}]));
            break;
        }
        case "stat": {
            dispatch(decreaseStats([{key: requirement.key, amount: requirement.amount}]));
            break;
        }
    }
};
export const handleCompleteQuest = (dispatch: Dispatch<UnknownAction>, questId: number) => {
    const questData = QUEST_DATA[questId];
    const statRewards: IncreaseStatsPayload[] = [];
    const itemRewards: InventoryItem[] = [];
    questData.rewards.forEach((reward) => {
        switch (reward.type) {
            case "item":
                itemRewards.push({name: reward.name, amount: reward.amount});
                break;
            case "stat":
                statRewards.push({key: reward.key, amount: reward.amount});
                break;
        }
    });
    dispatch(increaseStats(statRewards));
    dispatch(addItemsToInventory(itemRewards));
};
export const checkIfCanShowQuestOption = (requiredQuestProgress: RequiredQuestProgressProps) => {
    const {dialogues} = gameState.getState();
    const {id, step} = requiredQuestProgress;
    if (dialogues.quests[id] === step) return true;
    return false;
};

export const checkIfCanProceedQuest = (requiredQuestProgress: RequiredQuestProgressProps) => {
    const {battleState, playerStats, playerInventory, dialogues} = gameState.getState();
    const {id, step} = requiredQuestProgress;
    const {requirement} = QUEST_DATA[id].steps[step];
    switch (requirement.type) {
        case "enemy":
            if (battleState.totalEnemyKillCount[requirement.id] < requirement.amount) return false;
            break;
        case "item": {
            const item = playerInventory.find((item) => item && item.name === requirement.name);
            if (!item || item.amount < requirement.amount) return false;
            break;
        }
        case "stat": {
            const stat = playerStats[requirement.key];
            if (!stat || stat < requirement.amount) return false;
            break;
        }
        case "quest":
            if (dialogues.quests[requirement.id] !== -1) return false;
            break;
        case "wave": {
            const waveKillcount = battleState.zoneWaveProgression[requirement.zoneId][requirement.wave];
            if (waveKillcount === undefined || waveKillcount < requirement.amount) return false;
            break;
        }
    }

    return true;
};
