import {useSelector} from "react-redux";
import ENEMIES_DATA from "../../data/enemiesData";
import ZONES_DATA from "../../data/zonesData";
import WaveCounterComponent from "./WaveCounterComponent";
import {RootState} from "../../gameState/store";

function ZoneInfoBar() {
    const {zoneWaveProgression, currentWave, zoneId, enemy} = useSelector((state: RootState) => state.battleState);
    const currentZoneData = ZONES_DATA[zoneId];

    const currentKillCount = zoneWaveProgression[zoneId][currentWave] ?? 0;
    const hasReachedRequiredKillCount = currentKillCount >= ZONES_DATA[zoneId].enemiesPerWave;
    const maxKillCount = currentWave === ZONES_DATA[zoneId].maxWave ? "1" : ZONES_DATA[zoneId].enemiesPerWave;

    const getEnemyName = () => {
        return enemy ? " - " + ENEMIES_DATA[enemy.id].name : "";
    };

    return (
        <div className="flex bg-black bg-opacity-75 p-2">
            <div className="flex-col ">
                <h1 className="mb-2 text-xl">
                    {currentZoneData.name} {getEnemyName()}
                </h1>
                <span className="text-lg rounded-md">
                    Kill Count: {hasReachedRequiredKillCount ? currentKillCount : `${currentKillCount}/${maxKillCount}`}
                </span>
            </div>
            <WaveCounterComponent />
        </div>
    );
}

export default ZoneInfoBar;
