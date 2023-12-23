import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";
import {SkillNames} from "./skillTreesData";

export type QuestProps = {
    id: number;
    name: string;
    rewards: Array<StatReward | ItemReward | SkillReward>;
    steps: QuestStepProps[];
};

export type QuestStepProps = {
    description: string;
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

const QUEST_DATA: QuestProps[] = [
    {
        id: 0,
        name: "Meat shortage",
        steps: [{description: "Bartender in La Harpar tavern asked me to bring her 50 crab meat."}],
        rewards: [
            {type: "stat", key: "unspentSkillPoints", amount: 1, label: "Skill Point"},
            {type: "stat", key: "experience", amount: 200, label: "Experience"},
            {type: "stat", key: "goldCoins", amount: 120, label: "Gold Coins"},
        ],
    },
    {
        id: 1,
        name: "Clearing out the beach",
        steps: [{description: "I'm supposed to kill 50 enemies on wave 7 on Horseshoe Beach."}],
        rewards: [
            {type: "stat", key: "experience", amount: 250, label: "Experience"},
            {type: "stat", key: "goldCoins", amount: 150, label: "Gold Coins"},
            {type: "item", id: 8, amount: 1, label: "Turtle Shell Legs"},
        ],
    },
];

export default QUEST_DATA;
