export type SkillTreeNames = "Damage" | "Exploration" | "Magic";
export type SkillNames = "Attack Power" | "Attack Speed" | "Overkill";

export type SkillProps = {
    id: number;
    name: SkillNames;
    skillPointCost: number;
    unlockRequirements: null;
    row: number;
    col: number;
    special?: boolean;
    maxLevel: number;
};
export type SkillTreeProps = {
    id: number;
    name: SkillTreeNames;
    skills: SkillProps[];
    unlockedRequirement: null;
};

const DAMAGE_SKILLS_DATA: SkillProps[] = [
    {id: 0, name: "Attack Power", skillPointCost: 1, unlockRequirements: null, row: 6, col: 2, maxLevel: 5},
    {id: 1, name: "Attack Speed", skillPointCost: 1, unlockRequirements: null, row: 5, col: 1, maxLevel: 5},
    {id: 2, name: "Overkill", skillPointCost: 1, unlockRequirements: null, row: 5, col: 2, maxLevel: 5},
    {id: 3, name: "Overkill", skillPointCost: 1, unlockRequirements: null, row: 5, col: 3, maxLevel: 5},
    {id: 4, name: "Overkill", skillPointCost: 1, unlockRequirements: null, row: 4, col: 1, maxLevel: 5},
    {id: 5, name: "Overkill", skillPointCost: 1, unlockRequirements: null, row: 4, col: 2, maxLevel: 5},
    {id: 6, name: "Overkill", skillPointCost: 1, unlockRequirements: null, row: 4, col: 3, maxLevel: 5},
    {id: 7, name: "Overkill", skillPointCost: 1, unlockRequirements: null, row: 3, col: 2, maxLevel: 1, special: true},
];

const SKILL_TREES_DATA: SkillTreeProps[] = [
    {id: 0, name: "Damage", skills: DAMAGE_SKILLS_DATA, unlockedRequirement: null},
    {id: 1, name: "Exploration", skills: [], unlockedRequirement: null},
    {id: 2, name: "Magic", skills: [], unlockedRequirement: null},
];

export default SKILL_TREES_DATA;
