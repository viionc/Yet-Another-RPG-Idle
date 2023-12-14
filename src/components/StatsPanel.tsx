import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import {calculateXp} from "../utils/levelUtils";
import {increaseStats} from "../gameState/storeSlices/playerStats";

function StatsPanel() {
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const dispatch = useDispatch();
    return (
        <section className="grid-span-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <ul>
                <li className="flex gap-2 items-center">
                    Level: {playerStats.level}{" "}
                    {playerStats.unspentSkillPoints ? (
                        <span className="border border-yellow-500 flex w-5 h-5 items-center justify-center hover:bg-white hover:text-neutral-800 cursor-pointer">
                            +
                        </span>
                    ) : null}
                </li>
                <li>
                    Xp: {playerStats.experience}/{calculateXp(playerStats.level + 1)}
                </li>
                <li>Mana: {playerStats.mana}</li>
                <li>Attack Power: {playerStats.attackPower}</li>
                <li>Attack Speed: {playerStats.attackSpeed}</li>
                <li>
                    <button onClick={() => dispatch(increaseStats([{id: "attackPower", amount: 1}]))}>+power</button>
                </li>
            </ul>
        </section>
    );
}

export default StatsPanel;
