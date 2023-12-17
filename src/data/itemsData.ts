export type Tiers = "Trash" | "Normal" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type ItemProps = {
    id: number;
    tier: Tiers;
    value: number;
    name: string;
    url: string;
    equipment?: EquipmentProps;
};

export type EquipmentTypes = "helmet" | "chest" | "legs" | "boots" | "weapon" | "offhand" | "amulet" | "ring1" | "ring2";
export type EquipmentProps = {
    stats: string;
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
        equipment: {stats: "+2 coins from enemies", type: "helmet"},
    },
    5: {
        id: 5,
        tier: "Uncommon",
        name: "Knife",
        url: "knife.png",
        value: 150,
        equipment: {stats: "+2 attack power", type: "weapon"},
    },
    6: {
        id: 6,
        tier: "Uncommon",
        name: "Turtle Shell Helmet",
        url: "turtleShell.png",
        value: 150,
        equipment: {stats: "+1 attack power", type: "helmet"},
    },
} as const;

export default ITEM_DATA;
