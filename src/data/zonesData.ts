export type ZoneNames = "Plains" | "Horseshoe Beach" | "Trader's Basement" | "The Long Path";
export type ZoneProps = {
    zoneId: number;
    url: string;
    enemies: number[];
    maxWave: number;
    enemiesPerWave: number;
    name: ZoneNames;
    bossEnemyId: number;
    nextZoneId?: number;
    previousZoneId?: number;
};

const ZONES_DATA: Record<number, ZoneProps> = {
    1: {
        zoneId: 1,
        nextZoneId: 3,
        name: "Horseshoe Beach",
        url: "./backgrounds/horseshoeBeach.png",
        enemies: [4, 5, 6],
        maxWave: 10,
        enemiesPerWave: 10,
        bossEnemyId: 7,
    },
    2: {
        zoneId: 2,
        name: "Trader's Basement",
        url: "./backgrounds/tradersBasement.png",
        enemies: [8],
        maxWave: 6,
        enemiesPerWave: 10,
        bossEnemyId: 9,
    },
    3: {
        zoneId: 3,
        previousZoneId: 1,
        nextZoneId: 4,
        name: "Plains",
        url: "./backgrounds/plains.png",
        enemies: [0, 1, 2],
        maxWave: 10,
        enemiesPerWave: 10,
        bossEnemyId: 3,
    },
    4: {
        zoneId: 4,
        previousZoneId: 3,
        name: "The Long Path",
        url: "./backgrounds/theLongPath.png",
        enemies: [10, 11, 12, 13],
        maxWave: 20,
        enemiesPerWave: 8,
        bossEnemyId: 14,
    },
};

export default ZONES_DATA;
