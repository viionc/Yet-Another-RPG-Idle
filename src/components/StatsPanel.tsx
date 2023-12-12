import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";

function StatsPanel() {
    const playerCombatStats = useSelector((state: RootState) => state.playerCombatStats);
    return (
        <section className="grid-span-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <ul>
                <li>Hit Points: {playerCombatStats.hp}</li>
                <li>Mana: {playerCombatStats.mana}</li>
                <li>Attack Power: {playerCombatStats.attackPower}</li>
                <li>Attack Speed: {playerCombatStats.attackSpeed}</li>
            </ul>
        </section>
    );
}

export default StatsPanel;
