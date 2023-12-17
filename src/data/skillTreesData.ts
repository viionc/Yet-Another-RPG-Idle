import {SpellNames} from "./spellsData";

export type SkillTreeNames = "Damage" | "Exploration" | "Magic";
export type SkillNames =
    | "Attack Power"
    | "Attack Speed"
    | "Overkill"
    | "Auto Wave Progress"
    | "Crit Chance"
    | "Crit Multi"
    | SpellNames
    | `temp${number}`;

export type SkillProps = {
    id: number;
    name: SkillNames;
    spellName?: SpellNames;
    skillPointCost: number;
    unlockRequirements: null;
    row: number;
    col: number;
    special?: boolean;
    maxLevel: number;
    url: string;
    description: string;
};
export type SkillTreeProps = {
    id: number;
    name: SkillTreeNames;
    skills: SkillProps[];
    unlockedRequirement: null;
};

const EXPLORATION_SKILLS_DATA: SkillProps[] = [
    {
        id: 0,
        name: "Auto Wave Progress",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 6,
        col: 2,
        maxLevel: 1,
        url: "./skills/autoWaveProgression.png",
        description: "Automatically progresses to next wave.",
    },
];

const DAMAGE_SKILLS_DATA: SkillProps[] = [
    {
        id: 0,
        name: "Attack Power",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 6,
        col: 2,
        maxLevel: 10,
        url: "./skills/attackPower.png",
        description: "Increases attack power by 1.",
    },
    {
        id: 1,
        name: "Attack Speed",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 5,
        col: 1,
        maxLevel: 5,
        url: "./skills/attackSpeed.png",
        description: "Increases attack speed by 0.2.",
    },
    {
        id: 2,
        name: "Overkill",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 5,
        col: 2,
        maxLevel: 4,
        url: "./skills/overkill.png",
        description: "25% of overkill damage carries over to the next battle per point.",
    },
    {
        id: 3,
        name: "Crit Chance",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 5,
        col: 3,
        maxLevel: 5,
        url: "./skills/critChance.png",
        description: "Increases crit chance by 1.",
    },
    {
        id: 4,
        name: "Crit Multi",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 4,
        col: 3,
        maxLevel: 5,
        url: "./skills/critMulti.png",
        description: "Increases crit multiplier by 10%.",
    },
    {
        id: 5,
        name: "temp5",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 4,
        col: 2,
        maxLevel: 5,
        url: "",
        description: "Increases attack power by 1.",
    },
    {
        id: 6,
        name: "temp6",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 4,
        col: 1,
        maxLevel: 5,
        url: "",
        description: "Increases attack power by 1.",
    },
    {
        id: 7,
        name: "Double Attack",
        spellName: "Double Attack",
        skillPointCost: 2,
        unlockRequirements: null,
        row: 3,
        col: 2,
        maxLevel: 1,
        special: true,
        url: "./skills/doubleAttack.png",
        description: "Unlocks Double Attack Spell.",
    },
];

const SKILL_TREES_DATA: SkillTreeProps[] = [
    {id: 0, name: "Damage", skills: DAMAGE_SKILLS_DATA, unlockedRequirement: null},
    {id: 1, name: "Exploration", skills: EXPLORATION_SKILLS_DATA, unlockedRequirement: null},
    {id: 2, name: "Magic", skills: [], unlockedRequirement: null},
];

export default SKILL_TREES_DATA;
