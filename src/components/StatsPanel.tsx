import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import {calculateXp} from "../utils/levelUtils";

function StatsPanel() {
    const playerStats = useSelector((state: RootState) => state.playerStats);
    return (
        <section className="grid-span-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <ul>
                <li>Level: {playerStats.level}</li>
                <li>
                    Xp: {playerStats.experience}/{calculateXp(playerStats.level + 1)}
                </li>
                <li>Mana: {playerStats.mana}</li>
                <li>Attack Power: {playerStats.attackPower}</li>
                <li>Attack Speed: {playerStats.attackSpeed}</li>
            </ul>
        </section>
    );
}

export default StatsPanel;
