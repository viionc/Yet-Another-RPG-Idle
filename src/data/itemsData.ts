export type Tiers = "Trash" | "Normal" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type ItemProps = {
    id: number;
    tier: Tiers;
    value: number;
    name: string;
    url: string;
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
        tier: "Normal",
        name: "Slime Golden Crown",
        url: "slimeGoldenCrown.png",
        value: 150,
    },
    5: {
        id: 5,
        tier: "Normal",
        name: "Knife",
        url: "knife.png",
        value: 150,
    },
} as const;

export default ITEM_DATA;
