import {useDispatch, useSelector} from "react-redux";
import ZONES_DATA from "../data/zonesData";
import {changeWave, handleAutoProgression} from "../gameState/storeSlices/battleState";
import {RootState} from "../gameState/store";
import {isMaxWave} from "../utils/wavesUtils";
// import {disableSetting, enableSetting} from "../gameState/storeSlices/playerSettings";
// import {disableSettings, enableSettings} from "../gameState/storeSlices/playerSettings";

function WaveCounterComponent() {
    const {zoneWaveProgression, currentWave, zoneId, autoWaveProgression} = useSelector((state: RootState) => state.battleState);
    const playerSkills = useSelector((state: RootState) => state.playerSkills);
    const dispatch = useDispatch();

    const currentZoneData = ZONES_DATA[zoneId];
    const currentKillCount = zoneWaveProgression[zoneId][currentWave] ?? 0;

    const _changeWave = (number: number) => {
        if (number === 1 && currentWave < currentZoneData.maxWave) dispatch(changeWave(currentWave + 1));
        else if (number === -1 && currentWave > 1) dispatch(changeWave(currentWave - 1));
    };

    const _handleAutoProgression = () => {
        dispatch(handleAutoProgression());
    };
    return (
        <div className="absolute top-1 right-1 p-1 text-2xl bg-black bg-opacity-50 px-1 rounded-md flex flex-col ">
            <div className="flex justify-center items-center">
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
                {!isMaxWave(currentWave, currentZoneData.maxWave) && currentKillCount >= currentZoneData.enemiesPerWave ? (
                    <span
                        className="border text-yellow-500 flex items-center justify-center px-1 w-8 cursor-pointer hover:bg-white rounded-md"
                        onClick={() => _changeWave(1)}>
                        {">"}
                    </span>
                ) : null}
            </div>
            {playerSkills["Auto Wave Progress"] ? (
                <div className="flex justify-end items-center px-1 gap-2">
                    <label>Auto:</label>
                    <input
                        type="checkbox"
                        onChange={_handleAutoProgression}
                        className="w-5 h-5 border-none"
                        checked={autoWaveProgression ? true : false}></input>
                </div>
            ) : null}
        </div>
    );
}

export default WaveCounterComponent;
