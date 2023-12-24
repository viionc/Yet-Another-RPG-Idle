import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";

export type Tiers = "Trash" | "Normal" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type ItemProps = {
    id: number;
    tier: Tiers;
    value: number;
    name: string;
    url: string;
    equipment?: EquipmentProps;
};

export type EquipmentStat = {
    type: keyof PlayerStatsProps;
    value: number;
    description: string;
};
export type EquipmentTypes = "helmet" | "chest" | "legs" | "boots" | "weapon" | "offhand" | "amulet" | "ring" | "gloves";
export type EquipmentProps = {
    stats: EquipmentStat[];
    type: EquipmentTypes;
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
        url: "slimeResidue.png",
        value: 1,
    },
    1: {
        id: 1,
        tier: "Normal",
        name: "Crab Meat",
        url: "crabMeat.png",
        value: 1,
    },
    2: {
        id: 2,
        tier: "Normal",
        name: "Feather",
        url: "feather.png",
        value: 1,
    },
    3: {
        id: 3,
        tier: "Normal",
        name: "Turtle Shell",
        url: "turtleShell.png",
        value: 1,
    },
    4: {
        id: 4,
        tier: "Uncommon",
        name: "Slime Golden Crown",
        url: "slimeGoldenCrown.png",
        value: 150,
        equipment: {
            stats: [
                {type: "goldCoinsMultiplier", value: 0.5, description: "50% more gold from enemies"},
                {type: "attackPower", value: 1, description: "+1 attack power"},
            ],
            type: "helmet",
        },
    },
    5: {
        id: 5,
        tier: "Uncommon",
        name: "Knife",
        url: "knife.png",
        value: 150,
        equipment: {stats: [{type: "attackPower", value: 3, description: "+3 attack power"}], type: "weapon"},
    },
    6: {
        id: 6,
        tier: "Uncommon",
        name: "Turtle Shell Helmet",
        url: "turtleShell.png",
        value: 20,
        equipment: {stats: [{type: "attackPower", value: 1, description: "+1 attack power"}], type: "helmet"},
    },
    7: {
        id: 7,
        tier: "Uncommon",
        name: "Turtle Shell Chest",
        url: "turtleShell.png",
        value: 50,
        equipment: {stats: [{type: "attackPower", value: 1, description: "+1 attack power"}], type: "chest"},
    },
    8: {
        id: 8,
        tier: "Uncommon",
        name: "Turtle Shell Legs",
        url: "turtleShell.png",
        value: 40,
        equipment: {stats: [{type: "attackPower", value: 1, description: "+1 attack power"}], type: "legs"},
    },
    9: {
        id: 9,
        tier: "Uncommon",
        name: "Turtle Shell Boots",
        url: "turtleShell.png",
        value: 20,
        equipment: {stats: [{type: "attackPower", value: 1, description: "+1 attack power"}], type: "boots"},
    },
    10: {
        id: 10,
        tier: "Uncommon",
        name: "Turtle Shell Gloves",
        url: "turtleShell.png",
        value: 20,
        equipment: {stats: [{type: "attackPower", value: 1, description: "+1 attack power"}], type: "gloves"},
    },
    11: {
        id: 11,
        tier: "Normal",
        name: "Stick",
        url: "stick.png",
        value: 1,
    },
    12: {
        id: 12,
        tier: "Normal",
        name: "Makeshift Club",
        url: "makeshiftClub.png",
        value: 10,
        equipment: {stats: [{type: "attackPower", value: 1, description: "+1 attack power"}], type: "weapon"},
    },
    13: {
        id: 13,
        tier: "Uncommon",
        name: "Josh's Heirloom",
        url: "joshsHeirloom.png",
        value: 150,
        equipment: {
            stats: [
                {type: "attackPower", value: 1, description: "+1 attack power"},
                {type: "attackSpeed", value: 0.1, description: "+0.1 attack speed"},
                {type: "xpMultiplier", value: 0.1, description: "+10% Experience Multiplier"},
            ],
            type: "ring",
        },
    },
} as const;

export default ITEM_DATA;
