import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";

export type SpellNames = "Fire Strike" | "Haste" | "Double Attack";
export type SpellTypesNames = "Melee Damage" | "Magic Damage" | "Support Stat Buff";
export type SpellProps = {
    id: number;
    name: SpellNames;
    manaCost: number;
    cooldown: number;
    url: string;
    effect: SpellEffectProps;
    description: string;
};

export type SpellEffectProps = SpellMeleeEffectProps | SpellMagicEffectProps | SpellSupportStatBuffEffectProps;

export type SpellMeleeEffectProps = {
    type: "Melee Damage";
};

export type SpellMagicEffectProps = {
    type: "Magic Damage";
    baseDamage: number;
};

export type SpellSupportStatBuffEffectProps = {
    type: "Support Stat Buff";
    duration: number;
    key: keyof PlayerStatsProps;
    value: number;
};

const SPELLS_DATA: Record<SpellNames, SpellProps> = {
    "Fire Strike": {
        id: 0,
        name: "Fire Strike",
        manaCost: 2,
        cooldown: 60,
        description: "Weak Fire Spell that deals 8 damage.",
        url: "./skills/fireStrike.png",
        effect: {
            type: "Magic Damage",
            baseDamage: 15,
        },
    },
    "Haste": {
        id: 1,
        name: "Haste",
        manaCost: 5,
        cooldown: 300,
        description: "Increases attack speed by 0.3 for 1 minute.",
        url: "./skills/haste.png",
        effect: {
            type: "Support Stat Buff",
            duration: 60,
            key: "attackSpeed",
            value: 0.3,
        },
    },
    "Double Attack": {
        id: 2,
        name: "Double Attack",
        manaCost: 2,
        cooldown: 60,
        description: "Quick double attack.",
        url: "./skills/doubleAttack.png",
        effect: {
            type: "Melee Damage",
        },
    },
};

export default SPELLS_DATA;
