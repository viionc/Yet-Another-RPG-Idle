import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import Spinner from "./Spinner";
import ZONES_DATA from "../data/zonesData";
import ENEMIES_DATA from "../data/enemiesData";
import WaveCounterComponent from "./WaveCounterComponent";
import EnemyComponent from "./EnemyComponent";
import {motion} from "framer-motion";
import {useEffect} from "react";
import {updateDamageHitSplat} from "../gameState/storeSlices/battleState";
import SPELLS_DATA from "../data/spellsData";

function BattlePanel() {
    const {zoneWaveProgression, currentWave, zoneId, enemy, damageForHitSplat} = useSelector((state: RootState) => state.battleState);
    const playerSpells = useSelector((state: RootState) => state.playerSpells);
    const dispatch = useDispatch();

    const currentZoneData = ZONES_DATA[zoneId];
    const currentKillCount = zoneWaveProgression[zoneId][currentWave] ?? 0;
    const hasReachedRequiredKillCount = currentKillCount >= ZONES_DATA[zoneId].enemiesPerWave;
    const maxKillCount = currentWave === ZONES_DATA[zoneId].maxWave ? "1" : ZONES_DATA[zoneId].enemiesPerWave;

    const getEnemyName = () => {
        return enemy ? " - " + ENEMIES_DATA[enemy.id].name : "";
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(updateDamageHitSplat(""));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [damageForHitSplat]); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="mb-2">
                {currentZoneData.name} {getEnemyName()}
            </h1>
            <div className="w-full h-[16.9rem] relative">
                <img src={currentZoneData.url} className="rounded-lg w-full object-cover max-h-full object-bottom "></img>
                <span className="absolute top-1 left-1 text-2xl bg-black bg-opacity-50 px-1 rounded-md">
                    Kill Count: {hasReachedRequiredKillCount ? currentKillCount : `${currentKillCount}/${maxKillCount}`}
                </span>
                <WaveCounterComponent></WaveCounterComponent>
                {enemy ? (
                    <EnemyComponent enemy={enemy}></EnemyComponent>
                ) : (
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spinner variant="xl" />
                    </div>
                )}
                <ul className="absolute bottom-1 left-1 flex gap-2">
                    {playerSpells.spellsQuickBar.map((spell) => {
                        if (!spell || !spell.currentDuration) return;
                        const spellData = SPELLS_DATA[spell.name];
                        if (spellData.effect.spellType !== "Support") return;
                        return (
                            <li className="w-12 h-12 relative" key={spell.name}>
                                <img src={spellData.url}></img>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">{spell.currentDuration}</span>
                            </li>
                        );
                    })}
                </ul>
                {damageForHitSplat ? (
                    <motion.span
                        initial={{top: "50%", right: "30%"}}
                        animate={{top: "30%", right: "33%"}}
                        transition={{duration: 2, type: "spring"}}
                        className={`absolute text-4xl z-30 flex justify-center items-center ${
                            damageForHitSplat.includes("!") ? "text-yellow-500" : "text-white"
                        }`}>
                        {damageForHitSplat}
                    </motion.span>
                ) : null}
            </div>
        </section>
    );
}

export default BattlePanel;
