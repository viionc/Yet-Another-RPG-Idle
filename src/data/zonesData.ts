export type ZoneProps = {
    zoneId: number;
    bgUrl: string;
    enemies: number[];
    maxWave: number;
    enemiesPerWave: number;
};

const ZONES_DATA: Record<number, ZoneProps> = {
    0: {
        zoneId: 0,
        bgUrl: "plains.png",
        enemies: [0, 1, 2],
        maxWave: 10,
        enemiesPerWave: 10,
    },
};

export default ZONES_DATA;
