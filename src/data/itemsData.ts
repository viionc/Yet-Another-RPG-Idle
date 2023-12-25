import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";

export type Tiers = "Trash" | "Normal" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type ItemProps = {
    id: number;
    tier: Tiers;
    value: number;
    name: string;
    url: string;
    extra?: EquipmentProps | UseItemProps;
    description?: string;
};

export type UseItemProps = UseItemStatProps;
export type UseItemStatProps = {
    type: "stat";
    key: keyof PlayerStatsProps;
    amount: 1;
};

export type EquipmentStat = {
    type: keyof PlayerStatsProps;
    value: number;
    description: string;
};
export type EquipmentSlotsNames = "helmet" | "chest" | "legs" | "boots" | "weapon" | "offhand" | "amulet" | "ring" | "gloves";
export type EquipmentProps = {
    type: "equipment";
    stats: EquipmentStat[];
    slot: EquipmentSlotsNames;
};

export const colorsByItemTier: Record<Tiers, string> = {
    "Trash": "rgb(180, 180, 180, 0.6)",
    "Normal": "rgb(255, 255, 255, 0.6)",
    "Uncommon": "rgb(60, 179, 113, 0.6)",
    "Rare": "rgb(0, 118, 255, 0.6)",
    "Epic": "rgb(179, 64, 255, 0.6)",
    "Legendary": "rgb(255, 152, 25, 0.6)",
};

export const ITEM_TIER_VALUE: Record<Tiers, number> = {
    "Trash": 0,
    "Normal": 1,
    "Uncommon": 2,
    "Rare": 3,
    "Epic": 4,
    "Legendary": 5,
};

const ITEM_DATA: Record<number, ItemProps> = {
    0: {
        id: 0,
        tier: "Normal",
        name: "Slime Residue",
        url: "./items/slimeResidue.png",
        value: 1,
    },
    1: {
        id: 1,
        tier: "Normal",
        name: "Crab Meat",
        url: "./items/crabMeat.png",
        value: 1,
    },
    2: {
        id: 2,
        tier: "Normal",
        name: "Feather",
        url: "./items/feather.png",
        value: 1,
    },
    3: {
        id: 3,
        tier: "Normal",
        name: "Turtle Shell",
        url: "./items/turtleShell.png",
        value: 1,
    },
    4: {
        id: 4,
        tier: "Uncommon",
        name: "Slime Golden Crown",
        url: "./items/slimeGoldenCrown.png",
        value: 150,
        extra: {
            type: "equipment",
            stats: [
                {type: "goldCoinsMultiplier", value: 0.5, description: "50% more gold from enemies"},
                {type: "attackPower", value: 1, description: "+1 attack power"},
            ],
            slot: "helmet",
        },
    },
    5: {
        id: 5,
        tier: "Uncommon",
        name: "Knife",
        url: "./items/knife.png",
        value: 150,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 3, description: "+3 attack power"}],
            slot: "weapon",
        },
    },
    6: {
        id: 6,
        tier: "Uncommon",
        name: "Turtle Shell Helmet",
        url: "./items/turtleShell.png",
        value: 20,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "helmet",
        },
    },
    7: {
        id: 7,
        tier: "Uncommon",
        name: "Turtle Shell Chest",
        url: "./items/turtleShell.png",
        value: 50,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "chest",
        },
    },
    8: {
        id: 8,
        tier: "Uncommon",
        name: "Turtle Shell Legs",
        url: "./items/turtleShell.png",
        value: 40,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "legs",
        },
    },
    9: {
        id: 9,
        tier: "Uncommon",
        name: "Turtle Shell Boots",
        url: "./items/turtleShell.png",
        value: 20,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "boots",
        },
    },
    10: {
        id: 10,
        tier: "Uncommon",
        name: "Turtle Shell Gloves",
        url: "./items/turtleShell.png",
        value: 20,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "gloves",
        },
    },
    11: {
        id: 11,
        tier: "Normal",
        name: "Stick",
        url: "./items/stick.png",
        value: 1,
    },
    12: {
        id: 12,
        tier: "Normal",
        name: "Makeshift Club",
        url: "./items/makeshiftClub.png",
        value: 10,
        extra: {
            type: "equipment",
            stats: [{type: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "weapon",
        },
    },
    13: {
        id: 13,
        tier: "Uncommon",
        name: "Josh's Heirloom",
        url: "./items/joshsHeirloom.png",
        value: -1,
        extra: {
            type: "equipment",
            stats: [
                {type: "attackPower", value: 1, description: "+1 attack power"},
                {type: "attackSpeed", value: 0.1, description: "+0.1 attack speed"},
                {type: "xpMultiplier", value: 0.1, description: "+10% Experience Multiplier"},
            ],
            slot: "ring",
        },
    },
    14: {
        id: 14,
        tier: "Normal",
        name: "Rat Tail",
        url: "./items/ratTail.png",
        value: 5,
    },
    15: {
        id: 15,
        tier: "Legendary",
        name: "Skill Point Book",
        url: "./items/skillPointBook.png",
        value: -1,
        description: "Gives 1 Skill Point upon reading.",
        extra: {
            type: "stat",
            amount: 1,
            key: "unspentSkillPoints",
        },
    },
    16: {
        id: 16,
        tier: "Normal",
        name: "Apple",
        url: "./items/apple.png",
        value: 1,
    },
    17: {
        id: 17,
        tier: "Normal",
        name: "Fish Meat",
        url: "./items/fishMeat.png",
        value: 1,
    },
} as const;

export default ITEM_DATA;
