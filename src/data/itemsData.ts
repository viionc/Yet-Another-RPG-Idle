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
};

export default ITEM_DATA;
