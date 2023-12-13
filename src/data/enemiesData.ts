export type EnemyNames = "Slime";

export interface EnemyProps {
    maxHp: number;
    name: EnemyNames;
    id: number;
    experience: number;
}

const ENEMIES_DATA: Record<number, EnemyProps> = {
    0: {
        maxHp: 2,
        name: "Slime",
        id: 0,
        experience: 5,
    },
};

export default ENEMIES_DATA;
