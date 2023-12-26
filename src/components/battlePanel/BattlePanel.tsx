import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import Spinner from "../Spinner";
import ZONES_DATA from "../../data/zonesData";
import EnemyComponent from "./EnemyComponent";
import {motion} from "framer-motion";
import {useEffect} from "react";
import {updateDamageHitSplat} from "../../gameState/storeSlices/battleState";
import SPELLS_DATA from "../../data/spellsData";
import ZoneInfoBar from "./ZoneInfoBar";
import ZonesMap from "./ZonesMap";

function BattlePanel() {
    const {zoneId, enemy, damageForHitSplat} = useSelector((state: RootState) => state.battleState);
    const playerSpells = useSelector((state: RootState) => state.playerSpells);
    const {zonesMap} = useSelector((state: RootState) => state.unlocks);
    const dispatch = useDispatch();

    const currentZoneData = ZONES_DATA[zoneId];

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(updateDamageHitSplat(""));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [damageForHitSplat, dispatch]);

    return (
        <section
            className="border rounded-md col-span-2  border-slate-800 bg-center bg-cover bg-no-repeat"
            style={{backgroundImage: `url(${currentZoneData.url})`}}>
            <div className="w-full h-full relative">
                <ZoneInfoBar />
                {enemy ? (
                    <EnemyComponent enemy={enemy} />
                ) : (
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spinner variant="xl" />
                    </div>
                )}
                <ul className="absolute bottom-1 left-1 flex gap-2">
                    {playerSpells.spellsQuickBar.map((spell) => {
                        if (!spell || !spell.currentDuration) return;
                        const spellData = SPELLS_DATA[spell.name];
                        if (spellData.effect.type !== "Support Stat Buff") return;
                        return (
                            <li className="w-12 h-12 relative" key={spell.name}>
                                <img src={spellData.url} className="h-12 w-12" alt={`${spellData.name} spell buff`}></img>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">{spell.currentDuration}</span>
                            </li>
                        );
                    })}
                </ul>
                {zonesMap ? <ZonesMap /> : null}
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
