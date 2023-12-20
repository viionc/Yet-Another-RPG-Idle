import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import {calculateXp} from "../utils/levelUtils";
import {short} from "../utils/misc";

function StatsPanel() {
    const playerStats = useSelector((state: RootState) => state.playerStats);
    return (
        <section className="grid-span-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="mb-2">Stats:</h1>
            <ul>
                <li className="flex gap-2 items-center">
                    Level: {playerStats.level}{" "}
                    {playerStats.unspentSkillPoints ? (
                        <>
                            <span>- Skill Points: {playerStats.unspentSkillPoints}</span>
                        </>
                    ) : null}
                </li>
                <li>
                    Xp: {playerStats.experience.toLocaleString("en-US")}/{calculateXp(playerStats.level + 1).toLocaleString("en-US")}
                </li>
                <li className="text-yellow-500">Gold: {short(playerStats.goldCoins)}</li>
                <li className="text-yellow-500">Gold Multiplier: {Math.floor(playerStats.goldCoinsMultiplier * 100)}%</li>
                <li>
                    Mana: {playerStats.mana}/{playerStats.maxMana} <span className="text-blue-500">{playerStats.currentManaRegenTimer}</span>
                </li>
                <li>Attack Power: {playerStats.attackPower}</li>
                <li>Attack Speed: {playerStats.attackSpeed.toFixed(1)}</li>
                {playerStats.critChance > 0 ? (
                    <>
                        <li>Crit Chance: {playerStats.critChance}%</li>
                        <li>Crit Multi: {Math.floor((playerStats.critMulti - 1) * 100)}%</li>
                    </>
                ) : null}
            </ul>
        </section>
    );
}

export default StatsPanel;
