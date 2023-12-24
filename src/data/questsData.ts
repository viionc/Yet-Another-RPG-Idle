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
    requirement: ItemRequirement | WaveKillCount | EnemyKillCount | QuestRequirement | StatRequirement;
};

type StatRequirement = {
    type: "stat";
    key: keyof PlayerStatsProps;
    amount: number;
    label: string;
};
type QuestRequirement = {
    type: "quest";
    id: number;
};

type ItemRequirement = {
    type: "item";
    id: number;
    amount: number;
};

type WaveKillCount = {
    type: "wave";
    zoneId: number;
    wave: number;
    amount: number;
};

type EnemyKillCount = {
    type: "enemy";
    id: number;
    amount: number;
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
};

type SkillReward = {
    type: "skill";
    name: SkillNames;
};

// {description: "", requirement: {type: "stat", key: "level", amount:1 }}, first step if no requirements needed to start the quest

const QUEST_DATA: QuestProps[] = [
    {
        id: 0,
        name: "Meat shortage",
        steps: [
            {description: "", requirement: {type: "stat", key: "level", amount: 1, label: "Level"}},
            {description: "Bartender in La Harpar tavern asked me to bring her 50 crab meat.", requirement: {type: "item", id: 1, amount: 50}},
        ],
        rewards: [
            {type: "stat", key: "unspentSkillPoints", amount: 1, label: "Skill Point"},
            {type: "stat", key: "experience", amount: 1000, label: "Experience"},
            {type: "stat", key: "goldCoins", amount: 200, label: "Gold Coins"},
        ],
    },
    {
        id: 1,
        name: "Clearing out the beach",
        steps: [
            {description: "", requirement: {type: "stat", key: "level", amount: 1, label: "Level"}},
            {
                description: "I'm supposed to kill 50 enemies on wave 7 on Horseshoe Beach.",
                requirement: {type: "wave", zoneId: 0, wave: 7, amount: 50},
            },
        ],
        rewards: [
            {type: "stat", key: "experience", amount: 1500, label: "Experience"},
            {type: "stat", key: "goldCoins", amount: 250, label: "Gold Coins"},
            {type: "item", id: 13, amount: 1},
        ],
    },
    {
        id: 2,
        name: "Rats, we're rats",
        steps: [
            {description: "", requirement: {type: "stat", key: "level", amount: 1, label: "Level"}},
            {
                description: "I'm supposed to kill 50 rats in Trader's basement.",
                requirement: {type: "enemy", id: 8, amount: 50},
            },
        ],
        rewards: [
            {type: "stat", key: "unspentSkillPoints", amount: 1, label: "Skill Point"},
            {type: "stat", key: "experience", amount: 1500, label: "Experience"},
            {type: "stat", key: "goldCoins", amount: 300, label: "Gold Coins"},
        ],
    },
];

export default QUEST_DATA;
