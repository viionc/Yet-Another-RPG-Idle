export type ZoneNames = "Plains";
export type ZoneProps = {
    zoneId: number;
    url: string;
    enemies: number[];
    maxWave: number;
    enemiesPerWave: number;
    name: ZoneNames;
    bossEnemyId: number;
};

const ZONES_DATA: Record<number, ZoneProps> = {
    0: {
        zoneId: 0,
        name: "Plains",
        url: "./backgrounds/plains.png",
        enemies: [0, 1, 2],
        maxWave: 10,
        enemiesPerWave: 10,
        bossEnemyId: 3,
    },
};

export default ZONES_DATA;
