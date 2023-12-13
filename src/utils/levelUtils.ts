// export const calculateLevelByXp = (totalXp: number) => {
//     return Math.floor((Math.sqrt(100 * (2 * totalXp + 25)) + 50) / 100);
// };

// export const xpNeededToLevelUp = (totalXp: number) => {
//     const currentLevel = calculateLevelByXp(totalXp);
//     const xpNeededForNextLevel = calculateXp(currentLevel + 1);
//     return xpNeededForNextLevel;
// };

export const calculateXp = (level: number) => {
    //Tibia XP formula
    return (50 * (Math.pow(level, 3) - 6 * Math.pow(level, 2) + 17 * level - 12)) / 3;
};
