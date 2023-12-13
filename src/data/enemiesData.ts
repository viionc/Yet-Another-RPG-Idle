export type EnemyNames = "Slime";
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
}

const ENEMIES_DATA: Record<number, EnemyProps> = {
    0: {
        maxHp: 2,
        name: "Slime",
        id: 0,
        experience: 5,
        drops: [{id: 0, minAmount: 1, maxAmount: 2, chance: 1}],
    },
};

export default ENEMIES_DATA;
