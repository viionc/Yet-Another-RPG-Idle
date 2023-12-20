import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";

export type SpellNames = "Fire Strike" | "Haste" | "Double Attack";
export type SpellProps = {
    id: number;
    name: SpellNames;
    manaCost: number;
    cooldown: number;
    url: string;
    effect: SpellEffectProps;
    description: string;
};

export type SpellEffectProps = {
    spellType: "Damage" | "Support";
    damageType?: "Magic" | "Melee";
    damage?: number;
    duration?: number;
    playerStat?: keyof PlayerStatsProps;
    value?: number;
};

const SPELLS_DATA: Record<SpellNames, SpellProps> = {
    "Fire Strike": {
        id: 0,
        name: "Fire Strike",
        manaCost: 1,
        cooldown: 5,
        description: "Weak Fire Spell that deals 8 damage.",
        url: "./skills/fireStrike.png",
        effect: {
            spellType: "Damage",
            damageType: "Magic",
            damage: 8,
        },
    },
    "Haste": {
        id: 1,
        name: "Haste",
        manaCost: 1,
        cooldown: 61,
        description: "Increases attack speed by 0.3 for 1 minute.",
        url: "./skills/haste.png",
        effect: {
            spellType: "Support",
            duration: 60,
            playerStat: "attackSpeed",
            value: 0.3,
        },
    },
    "Double Attack": {
        id: 2,
        name: "Double Attack",
        manaCost: 1,
        cooldown: 2,
        description: "Quick double attack.",
        url: "./skills/doubleAttack.png",
        effect: {
            spellType: "Damage",
            damageType: "Melee",
        },
    },
};

export default SPELLS_DATA;
