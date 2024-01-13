import {ItemNames} from "./itemsData";

export const ELEMENTS = ["Physical", "Fire", "Water", "Air", "Earth", "Dark", "Light"] as const;
export type ElementsNames = (typeof ELEMENTS)[number];

export type EnemyDrop = {
    name: ItemNames;
    minAmount: number;
    maxAmount: number;
    chance: number;
};
export interface EnemyProps {
    maxHp: number;
    name: string;
    id: number;
    experience: number;
    weakness: ElementsNames;
    drops: EnemyDrop[];
    url: string;
    isBossEnemy?: boolean;
}

const ENEMIES_DATA: Record<number, EnemyProps> = {
    0: {
        maxHp: 2,
        name: "Green Slime",
        id: 0,
        weakness: "Fire",
        experience: 5,
        drops: [{name: "Slime Residue", minAmount: 1, maxAmount: 2, chance: 3}],
        url: "./enemies/greenSlime.png",
    },
    1: {
        maxHp: 3,
        name: "Red Slime",
        weakness: "Water",
        id: 1,
        experience: 5,
        drops: [{name: "Slime Residue", minAmount: 1, maxAmount: 2, chance: 3}],
        url: "./enemies/redSlime.png",
    },
    2: {
        maxHp: 2,
        name: "Blue Slime",
        weakness: "Air",
        id: 2,
        experience: 5,
        drops: [{name: "Slime Residue", minAmount: 1, maxAmount: 2, chance: 3}],
        url: "./enemies/blueSlime.png",
    },
    3: {
        maxHp: 100,
        name: "King Slime",
        weakness: "Fire",
        id: 3,
        experience: 40,
        drops: [
            {name: "Slime Golden Crown", minAmount: 1, maxAmount: 1, chance: 10},
            {name: "Slime Residue", minAmount: 1, maxAmount: 10, chance: 1},
        ],
        url: "./enemies/kingSlime.png",
        isBossEnemy: true,
    },
    4: {
        maxHp: 2,
        name: "Crab",
        weakness: "Physical",
        id: 4,
        experience: 5,
        drops: [
            {name: "Crab Meat", minAmount: 1, maxAmount: 1, chance: 2},
            {name: "Stick", minAmount: 1, maxAmount: 1, chance: 4},
        ],
        url: "./enemies/crab.png",
    },
    5: {
        maxHp: 3,
        name: "Seagull",
        weakness: "Physical",
        id: 5,
        experience: 8,
        drops: [
            {name: "Feather", minAmount: 1, maxAmount: 2, chance: 2},
            {name: "Stick", minAmount: 1, maxAmount: 1, chance: 4},
        ],
        url: "./enemies/seagull.png",
    },
    6: {
        maxHp: 5,
        name: "Turtle",
        weakness: "Fire",
        id: 6,
        experience: 10,
        drops: [
            {name: "Turtle Shell", minAmount: 1, maxAmount: 1, chance: 3},
            {name: "Stick", minAmount: 1, maxAmount: 1, chance: 4},
        ],
        url: "./enemies/turtle.png",
    },
    7: {
        maxHp: 50,
        name: "Gangster Crab",
        weakness: "Physical",
        id: 7,
        experience: 50,
        drops: [
            {name: "Knife", minAmount: 1, maxAmount: 1, chance: 10},
            {name: "Crab Meat", minAmount: 1, maxAmount: 3, chance: 1},
        ],
        url: "./enemies/gangsterCrab.png",
        isBossEnemy: true,
    },
    8: {
        maxHp: 8,
        name: "Rat",
        weakness: "Fire",
        id: 8,
        experience: 11,
        drops: [
            {
                name: "Rat Tail",
                minAmount: 1,
                maxAmount: 1,
                chance: 1,
            },
            {
                name: "Cheese",
                minAmount: 1,
                maxAmount: 1,
                chance: 8,
            },
        ],
        url: "./enemies/rat.png",
    },
    9: {
        maxHp: 75,
        name: "Giant Rat",
        weakness: "Fire",
        id: 9,
        experience: 100,
        drops: [
            {
                name: "Rat Tail",
                minAmount: 1,
                maxAmount: 1,
                chance: 1,
            },
            {
                name: "Cheese",
                minAmount: 1,
                maxAmount: 3,
                chance: 2,
            },
            {
                name: "Rat Catcher",
                minAmount: 1,
                maxAmount: 1,
                chance: 40,
            },
        ],
        url: "./enemies/giantRat.png",
        isBossEnemy: true,
    },
    10: {
        maxHp: 50,
        name: "Wolf",
        weakness: "Fire",
        id: 10,
        experience: 30,
        drops: [
            {
                name: "Wolf Fangs",
                minAmount: 1,
                maxAmount: 3,
                chance: 2,
            },
        ],
        url: "./enemies/wolf.png",
    },
    11: {
        maxHp: 25,
        name: "Deer",
        weakness: "Fire",
        id: 11,
        experience: 20,
        drops: [
            {
                name: "Deer Pelt",
                minAmount: 1,
                maxAmount: 1,
                chance: 4,
            },
        ],
        url: "./enemies/deer.png",
    },
    12: {
        maxHp: 75,
        name: "Bandit",
        weakness: "Air",
        id: 12,
        experience: 50,
        drops: [
            {
                name: "Vial of Water",
                minAmount: 1,
                maxAmount: 1,
                chance: 6,
            },
            {
                name: "Trophy Necklace",
                minAmount: 1,
                maxAmount: 1,
                chance: 100,
            },
            {
                name: "Machete",
                minAmount: 1,
                maxAmount: 1,
                chance: 80,
            },
        ],
        url: "./enemies/bandit.png",
    },
    13: {
        maxHp: 30,
        name: "Goblin Scout",
        weakness: "Fire",
        id: 13,
        experience: 25,
        drops: [],
        url: "./enemies/goblinScout.png",
    },
    14: {
        maxHp: 200,
        name: "Troll",
        weakness: "Water",
        id: 14,
        experience: 500,
        drops: [],
        url: "./enemies/troll.png",
        isBossEnemy: true,
    },
};

export default ENEMIES_DATA;
