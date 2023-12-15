import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import Spinner from "./Spinner";
import ZONES_DATA from "../data/zonesData";
import ENEMIES_DATA from "../data/enemiesData";
import {changeWave} from "../gameState/storeSlices/battleState";
import {isMaxWave} from "../utils/wavesUtils";

function BattlePanel() {
    const {zoneWaveProgression, currentWave, zoneId, enemy} = useSelector((state: RootState) => state.battleState);
    const dispatch = useDispatch();

    const currentZoneData = ZONES_DATA[zoneId];
    const getEnemyName = () => {
        return enemy ? " - " + ENEMIES_DATA[enemy.id].name : "";
    };
    const getEnemyUrl = () => {
        return enemy ? ENEMIES_DATA[enemy.id].url : "";
    };
    const getCurrentKillCount = () => {
        return zoneWaveProgression[zoneId][currentWave] ?? 0;
    };

    const maxKillCount = currentWave === ZONES_DATA[zoneId].maxWave ? "~" : ZONES_DATA[zoneId].enemiesPerWave;

    const _changeWave = (number: number) => {
        if (number === 1 && currentWave < currentZoneData.maxWave) dispatch(changeWave(currentWave + 1));
        else if (number === -1 && currentWave > 1) dispatch(changeWave(currentWave - 1));
    };

    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="h-[2rem]">
                {currentZoneData.name} {getEnemyName()}
            </h1>
            <div className="w-full h-[16.9rem] relative">
                <img src={currentZoneData.url} className="rounded-lg w-full object-cover max-h-full object-bottom "></img>
                <span className="absolute top-1 left-1 text-2xl bg-black bg-opacity-50 px-1 rounded-md">
                    Kill Count: {getCurrentKillCount()}/{maxKillCount}
                </span>
                <div className="absolute top-1 right-1 p-1 text-2xl bg-black bg-opacity-50 px-1 rounded-md flex justify-center items-center ">
                    {currentWave > 1 ? (
                        <span
                            className="border text-yellow-500 flex items-center justify-center  px-1 w-8 cursor-pointer hover:bg-white rounded-md"
                            onClick={() => _changeWave(-1)}>
                            {"<"}
                        </span>
                    ) : null}
                    <span className={`${isMaxWave(currentWave, currentZoneData.maxWave) ? "text-yellow-500" : "text-white"} px-2`}>
                        Wave: {currentWave}/{currentZoneData.maxWave}
                    </span>
                    {!isMaxWave(currentWave, currentZoneData.maxWave) && getCurrentKillCount() >= currentZoneData.enemiesPerWave ? (
                        <span
                            className="border text-yellow-500 flex items-center justify-center px-1 w-8 cursor-pointer hover:bg-white rounded-md"
                            onClick={() => _changeWave(1)}>
                            {">"}
                        </span>
                    ) : null}
                </div>
                {enemy ? (
                    <div>
                        <div className="absolute z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[2rem] bg-black  rounded-lg flex justify-center items-center">
                            <span className="z-30">
                                {enemy.currentHp}/{enemy.maxHp}
                            </span>
                            <span
                                className="z-20 h-[2rem] rounded-lg absolute top-0 left-0 bg-red-500"
                                style={{width: (enemy.currentHp / enemy.maxHp) * 100 + "%"}}></span>
                        </div>

                        <img src={getEnemyUrl()} className="absolute z-10 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[7rem]"></img>
                    </div>
                ) : (
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spinner variant="xl" />
                    </div>
                )}
            </div>
        </section>
    );
}

export default BattlePanel;
