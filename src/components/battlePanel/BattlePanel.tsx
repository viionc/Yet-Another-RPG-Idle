import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import ZONES_DATA from "../../data/zonesData";
import EnemyComponent from "./EnemyComponent";
import {motion} from "framer-motion";
import {useEffect} from "react";
import {updateDamageHitSplat} from "../../gameState/storeSlices/battleState";
import ZoneInfoBar from "./ZoneInfoBar";
import ZonesMap from "./ZonesMap";
import BuffsInfoBar from "./BuffsInfoBar";

function BattlePanel() {
    const {zoneId, enemy, damageForHitSplat} = useSelector((state: RootState) => state.battleState);
    const playerSpells = useSelector((state: RootState) => state.playerSpells);
    const {unlocked} = useSelector((state: RootState) => state.playerUnlockedContent);
    const {Weaknesses} = useSelector((state: RootState) => state.playerSkills);
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
                <EnemyComponent enemy={enemy} weaknessesUnlocked={Weaknesses} />
                <BuffsInfoBar playerSpells={playerSpells} />
                {unlocked.zonesMap ? <ZonesMap /> : null}
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
