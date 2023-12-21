import {PlayerStatsProps} from "../../gameState/storeSlices/playerStats";

export type DialogueProps = {
    message: string;
    options: OptionsProps[];
};

export type OptionsProps = {
    response: string;
    next: number;
    special?: SpecialStatResponseProps | SpecialItemResponseProps;
};

export type SpecialStatResponseProps = {
    type: "stat";
    key: keyof PlayerStatsProps;
    amount: number;
    label: string;
};
export type SpecialItemResponseProps = {
    type: "item";
    id: number;
    amount: number;
};
