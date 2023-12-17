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
        manaCost: 5,
        cooldown: 60,
        description: "Weak Fire Spell that deals 6 damage.",
        url: "",
        effect: {
            spellType: "Damage",
            damageType: "Magic",
            damage: 6,
        },
    },
    "Haste": {
        id: 0,
        name: "Haste",
        manaCost: 1,
        cooldown: 300,
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
        id: 0,
        name: "Double Attack",
        manaCost: 3,
        cooldown: 60,
        description: "Quick double attack.",
        url: "./skills/doubleAttack.png",
        effect: {
            spellType: "Damage",
            damageType: "Melee",
        },
    },
};

export default SPELLS_DATA;
