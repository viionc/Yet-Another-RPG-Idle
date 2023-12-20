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
    | `temp${number}`
    | "Magic Damage"
    | "Max Mana"
    | "Mana Regen"
    | "Spell Crit";

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
    {
        id: 1,
        name: "Haste",
        spellName: "Haste",
        skillPointCost: 2,
        special: true,
        unlockRequirements: null,
        row: 5,
        col: 1,
        maxLevel: 1,
        url: "./skills/haste.png",
        description: "Unlocks Haste spell.",
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

const MAGIC_SKILLS_DATA: SkillProps[] = [
    {
        id: 0,
        name: "Fire Strike",
        spellName: "Fire Strike",
        skillPointCost: 2,
        unlockRequirements: null,
        row: 6,
        col: 2,
        special: true,
        maxLevel: 1,
        url: "./skills/fireStrike.png",
        description: "Unlocks Fire Strike Spell.",
    },
    {
        id: 2,
        name: "Max Mana",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 5,
        col: 1,
        maxLevel: 5,
        url: "./skills/maxMana.png",
        description: "Increases max mana by 1.",
    },
    {
        id: 3,
        name: "Mana Regen",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 5,
        col: 2,
        maxLevel: 5,
        url: "./skills/manaRegen.png",
        description: "Increases mana regen rate by 2s.",
    },
    {
        id: 4,
        name: "Magic Damage",
        skillPointCost: 1,
        unlockRequirements: null,
        row: 5,
        col: 3,
        maxLevel: 10,
        url: "./skills/magicDamage.png",
        description: "Increases damage of your magic spells by 1.",
    },
    {
        id: 5,
        name: "Spell Crit",
        skillPointCost: 2,
        unlockRequirements: null,
        row: 4,
        col: 2,
        special: true,
        maxLevel: 1,
        url: "./skills/spellCrit.png",
        description: "Your magic spells can crit.",
    },
];

const SKILL_TREES_DATA: SkillTreeProps[] = [
    {id: 0, name: "Damage", skills: DAMAGE_SKILLS_DATA, unlockedRequirement: null},
    {id: 1, name: "Exploration", skills: EXPLORATION_SKILLS_DATA, unlockedRequirement: null},
    {id: 2, name: "Magic", skills: MAGIC_SKILLS_DATA, unlockedRequirement: null},
];

export default SKILL_TREES_DATA;
