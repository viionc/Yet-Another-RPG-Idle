import {PlayerStatsProps} from "../../gameState/storeSlices/playerStats";
import {ItemNames} from "../itemsData";

export type DialogueProps = {
    message: string;
    options: OptionsProps[];
};

export type OptionsProps = {
    response: string;
    next: number;
    nextIfQuestStarted?: number;
    requiredQuestProgress?: RequiredQuestProgressProps;
    special?: SpecialResponseProps;
    close?: true;
    opensShop?: true;
};

export type SpecialResponseProps = SpecialStatResponseProps | SpecialItemResponseProps | SpecialQuestResponseProps;

export type RequiredQuestProgressProps = {
    id: number;
    step: number;
};

export type SpecialStatResponseProps = {
    type: "stat";
    key: keyof PlayerStatsProps;
    amount: number;
    label: string;
};
export type SpecialItemResponseProps = {
    type: "item";
    name: ItemNames;
    amount: number;
};
export type SpecialQuestResponseProps = {
    type: "quest";
    id: number;
    start?: true;
    end?: true;
};
