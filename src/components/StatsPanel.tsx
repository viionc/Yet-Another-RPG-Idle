import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import {calculateXp} from "../utils/levelUtils";

function StatsPanel({callback}: {callback: () => void}) {
    const playerStats = useSelector((state: RootState) => state.playerStats);
    return (
        <section className="grid-span-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <ul>
                <li className="flex gap-2 items-center">
                    Level: {playerStats.level}{" "}
                    {playerStats.unspentSkillPoints ? (
                        <>
                            <span>- Skill Points: {playerStats.unspentSkillPoints}</span>
                            <span
                                className="border border-yellow-500 flex w-5 h-5 items-center justify-center hover:bg-white hover:text-neutral-800 cursor-pointer"
                                onClick={callback}>
                                +
                            </span>
                        </>
                    ) : null}
                </li>
                <li>
                    Xp: {playerStats.experience}/{calculateXp(playerStats.level + 1)}
                </li>
                <li>Mana: {playerStats.mana}</li>
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
