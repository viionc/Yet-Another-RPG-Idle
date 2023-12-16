import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import Spinner from "./Spinner";
import ZONES_DATA from "../data/zonesData";
import ENEMIES_DATA from "../data/enemiesData";
import WaveCounterComponent from "./WaveCounterComponent";
import EnemyComponent from "./EnemyComponent";

function BattlePanel() {
    const {zoneWaveProgression, currentWave, zoneId, enemy} = useSelector((state: RootState) => state.battleState);

    const currentZoneData = ZONES_DATA[zoneId];
    const currentKillCount = zoneWaveProgression[zoneId][currentWave] ?? 0;
    const hasReachedRequiredKillCount = currentKillCount >= ZONES_DATA[zoneId].enemiesPerWave;
    const maxKillCount = currentWave === ZONES_DATA[zoneId].maxWave ? "1" : ZONES_DATA[zoneId].enemiesPerWave;

    const getEnemyName = () => {
        return enemy ? " - " + ENEMIES_DATA[enemy.id].name : "";
    };

    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="h-[2rem]">
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
            </div>
        </section>
    );
}

export default BattlePanel;
