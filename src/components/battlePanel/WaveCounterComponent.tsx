import {useDispatch, useSelector} from "react-redux";
import ZONES_DATA from "../../data/zonesData";
import {changeWave, changeZone, handleAutoProgression} from "../../gameState/storeSlices/battleState";
import {RootState} from "../../gameState/store";
import {isMaxWave} from "../../utils/wavesUtils";
// import {disableSetting, enableSetting} from "../gameState/storeSlices/playerSettings";
// import {disableSettings, enableSettings} from "../gameState/storeSlices/playerSettings";

function WaveCounterComponent() {
    const {zoneWaveProgression, currentWave, zoneId, autoWaveProgression} = useSelector((state: RootState) => state.battleState);
    const playerSkills = useSelector((state: RootState) => state.playerSkills);
    const dispatch = useDispatch();

    const {maxWave, enemiesPerWave, nextZoneId, previousZoneId} = ZONES_DATA[zoneId];
    const currentKillCount = zoneWaveProgression[zoneId][currentWave] ?? 0;
    const _isMaxWave = isMaxWave(currentWave, maxWave);

    const previousWave = () => {
        if (currentWave > 1) dispatch(changeWave(currentWave - 1));
        else if (previousZoneId) {
            dispatch(changeZone(previousZoneId));
            const maxWave = ZONES_DATA[previousZoneId].maxWave;
            dispatch(changeWave(maxWave));
        }
    };

    const nextWave = () => {
        if (currentWave < maxWave) dispatch(changeWave(currentWave + 1));
        else if (_isMaxWave && zoneWaveProgression[zoneId][maxWave] > 0 && nextZoneId) dispatch(changeZone(nextZoneId));
    };

    const canShowPreviousButton = currentWave > 1 || previousZoneId;
    const canShowNextButton = nextZoneId && (currentKillCount >= enemiesPerWave || (_isMaxWave && currentKillCount > 0)); //(!_isMaxWave && currentKillCount >= enemiesPerWave) || (_isMaxWave && currentKillCount > 0)

    const _handleAutoProgression = () => {
        dispatch(handleAutoProgression());
    };

    return (
        <div className=" ms-auto text-2xl  px-1 rounded-md flex flex-col ">
            <div className="flex justify-center items-center">
                {canShowPreviousButton ? (
                    <span
                        className="select-none border bg-zinc-800 bg-opacity-80 text-yellow-500 flex items-center justify-center  px-1 w-8 cursor-pointer hover:bg-yellow-500 hover:text-black rounded-md"
                        onClick={() => previousWave()}>
                        {"<"}
                    </span>
                ) : null}
                <span className={`w-52 text-center ${_isMaxWave ? "text-yellow-500" : "text-white"} px-2`}>
                    Wave: {currentWave}/{maxWave}
                </span>
                {canShowNextButton ? (
                    <span
                        className="select-none border bg-zinc-800 bg-opacity-80 text-yellow-500 flex items-center justify-center px-1 w-8 cursor-pointer hover:bg-yellow-500 hover:text-black  rounded-md"
                        onClick={() => nextWave()}>
                        {">"}
                    </span>
                ) : null}
            </div>
            {playerSkills["Auto Wave Progress"] ? (
                <div className="flex justify-end items-center px-1 gap-2">
                    <label htmlFor="auto-wave">Auto:</label>
                    <input
                        id="auto-wave"
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
