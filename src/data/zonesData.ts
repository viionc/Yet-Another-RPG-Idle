export type ZoneNames = "Plains" | "Horseshoe Beach" | "Trader's Basement";
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
        name: "Horseshoe Beach",
        url: "./backgrounds/horseshoeBeach.png",
        enemies: [4, 5, 6],
        maxWave: 10,
        enemiesPerWave: 10,
        bossEnemyId: 7,
    },
    1: {
        zoneId: 1,
        name: "Trader's Basement",
        url: "./backgrounds/tradersBasement.png",
        enemies: [8],
        maxWave: 6,
        enemiesPerWave: 10,
        bossEnemyId: 9,
    },
    2: {
        zoneId: 2,
        name: "Plains",
        url: "./backgrounds/plains.png",
        enemies: [0, 1, 2],
        maxWave: 10,
        enemiesPerWave: 10,
        bossEnemyId: 3,
    },
};

export default ZONES_DATA;
