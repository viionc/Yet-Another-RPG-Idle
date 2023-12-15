import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import Spinner from "./Spinner";
import ZONES_DATA from "../data/zonesData";
import ENEMIES_DATA from "../data/enemiesData";
import {changeWave} from "../gameState/storeSlices/battleState";

function BattlePanel() {
    const battleState = useSelector((state: RootState) => state.battleState);
    const dispatch = useDispatch();
    const currentZoneData = ZONES_DATA[battleState.zoneId];
    const getEnemyName = () => {
        return battleState.enemy ? " - " + ENEMIES_DATA[battleState.enemy.id].name : "";
    };
    const getEnemyUrl = () => {
        return battleState.enemy ? ENEMIES_DATA[battleState.enemy.id].url : "";
    };

    const maxKillCount = battleState.currentWave === ZONES_DATA[battleState.zoneId].maxWave ? "~" : ZONES_DATA[battleState.zoneId].enemiesPerWave;

    const _changeWave = (number: number) => {
        if (number === 1 && battleState.currentWave < currentZoneData.maxWave) dispatch(changeWave(battleState.currentWave + 1));
        else if (number === -1 && battleState.currentWave > 1) dispatch(changeWave(battleState.currentWave - 1));
    };

    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="h-[2rem]">
                {currentZoneData.name} {getEnemyName()}
            </h1>
            <div className="w-full h-[16.9rem] relative">
                <img src={currentZoneData.url} className="rounded-lg w-full object-cover max-h-full object-bottom "></img>
                <span className="absolute top-1 left-1 text-2xl bg-black bg-opacity-50 px-1 rounded-md">
                    Kill Count: {battleState.currentKillCount}/{maxKillCount}
                </span>
                <div className="absolute top-1 right-1 p-1 text-2xl bg-black bg-opacity-50 px-1 rounded-md flex justify-center items-center ">
                    {battleState.currentWave > 1 ? (
                        <span
                            className="border text-yellow-500 flex items-center justify-center  px-1 w-8 cursor-pointer hover:bg-white rounded-md"
                            onClick={() => _changeWave(-1)}>
                            {"<"}
                        </span>
                    ) : null}
                    <span className={`${battleState.currentWave === currentZoneData.maxWave ? "text-yellow-500" : "text-white"} px-2`}>
                        Wave: {battleState.currentWave}/{currentZoneData.maxWave}
                    </span>
                    {battleState.currentWave < currentZoneData.maxWave ? (
                        <span
                            className="border text-yellow-500 flex items-center justify-center px-1 w-8 cursor-pointer hover:bg-white rounded-md"
                            onClick={() => _changeWave(1)}>
                            {">"}
                        </span>
                    ) : null}
                </div>
                {battleState.enemy ? (
                    <div>
                        <div className="absolute z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[2rem] bg-black  rounded-lg flex justify-center items-center">
                            <span className="z-30">
                                {battleState.enemy.currentHp}/{battleState.enemy.maxHp}
                            </span>
                            <span
                                className="z-20 h-[2rem] rounded-lg absolute top-0 left-0 bg-red-500"
                                style={{width: (battleState.enemy.currentHp / battleState.enemy.maxHp) * 100 + "%"}}></span>
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
