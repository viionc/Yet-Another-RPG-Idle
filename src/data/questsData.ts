import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";
import {SkillNames} from "./skillTreesData";

export type QuestProps = {
    id: number;
    name: string;
    rewards: Array<StatReward | ItemReward | SkillReward>;
};

type StatReward = {
    type: "stat";
    key: keyof PlayerStatsProps;
    amount: number;
    label: string;
};

type ItemReward = {
    type: "item";
    id: number;
    amount: number;
    label: string;
};

type SkillReward = {
    type: "skill";
    name: SkillNames;
};
