export type EnemyNames = "Green Slime" | "Red Slime" | "Blue Slime" | "King Slime" | "Crab" | "Seagull" | "Turtle" | "Gangster Crab";
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
    isBossEnemy?: boolean;
}

const ENEMIES_DATA: Record<number, EnemyProps> = {
    0: {
        maxHp: 2,
        name: "Green Slime",
        id: 0,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 3}],
        url: "./enemies/greenSlime.png",
    },
    1: {
        maxHp: 3,
        name: "Red Slime",
        id: 1,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 3}],
        url: "./enemies/redSlime.png",
    },
    2: {
        maxHp: 2,
        name: "Blue Slime",
        id: 2,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 3}],
        url: "./enemies/blueSlime.png",
    },
    3: {
        maxHp: 100,
        name: "King Slime",
        id: 3,
        experience: 40,
        drops: [
            {id: 4, minAmount: 1, maxAmount: 1, chance: 10},
            {id: 0, minAmount: 1, maxAmount: 10, chance: 1},
        ],
        url: "./enemies/kingSlime.png",
        isBossEnemy: true,
    },
    4: {
        maxHp: 2,
        name: "Crab",
        id: 4,
        experience: 5,
        drops: [
            {id: 1, minAmount: 1, maxAmount: 1, chance: 2},
            {id: 11, minAmount: 1, maxAmount: 1, chance: 4},
        ],
        url: "./enemies/crab.png",
    },
    5: {
        maxHp: 3,
        name: "Seagull",
        id: 5,
        experience: 8,
        drops: [
            {id: 2, minAmount: 1, maxAmount: 2, chance: 2},
            {id: 11, minAmount: 1, maxAmount: 1, chance: 4},
        ],
        url: "./enemies/seagull.png",
    },
    6: {
        maxHp: 5,
        name: "Turtle",
        id: 6,
        experience: 10,
        drops: [
            {id: 3, minAmount: 1, maxAmount: 1, chance: 3},
            {id: 11, minAmount: 1, maxAmount: 1, chance: 4},
        ],
        url: "./enemies/turtle.png",
    },
    7: {
        maxHp: 50,
        name: "Gangster Crab",
        id: 7,
        experience: 50,
        drops: [
            {id: 5, minAmount: 1, maxAmount: 1, chance: 10},
            {id: 1, minAmount: 1, maxAmount: 3, chance: 1},
        ],
        url: "./enemies/gangsterCrab.png",
        isBossEnemy: true,
    },
};

export default ENEMIES_DATA;
