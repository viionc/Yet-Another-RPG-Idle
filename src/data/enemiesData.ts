export type EnemyNames = "Green Slime" | "Red Slime" | "Blue Slime";
export type EnemyDrop = {
    id: number;
    minAmount: number;
    maxAmount: number;
    chance: number;
};
export interface EnemyProps {
    maxHp: number;
    name: EnemyNames;
    id: number;
    experience: number;
    drops: EnemyDrop[];
    url: string;
}

const ENEMIES_DATA: Record<number, EnemyProps> = {
    0: {
        maxHp: 2,
        name: "Green Slime",
        id: 0,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 1}],
        url: "./enemies/greenSlime.png",
    },
    1: {
        maxHp: 3,
        name: "Red Slime",
        id: 1,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 1}],
        url: "./enemies/redSlime.png",
    },
    2: {
        maxHp: 2,
        name: "Blue Slime",
        id: 2,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 1}],
        url: "./enemies/blueSlime.png",
    },
};

export default ENEMIES_DATA;
