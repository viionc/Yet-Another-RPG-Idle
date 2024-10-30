import { useDispatch, useSelector } from 'react-redux'
import ZONES_DATA from '../../data/zonesData'
import { handleAutoProgression } from '../../store/battle-state'
import { GameState, thunkDispatch } from '../../store'
import { isMaxWave } from '../../utils/wavesUtils'
import { selectZoneProgression } from '../../store/battle-state/battle-state.selectors'
import { nextWave, previousWave } from '../../store/battle-state/battle-state.thunks'
import { SkillIds } from '../../consts/enums/ids/skill-ids.enum'
// import {disableSetting, enableSetting} from "../gameState/storeSlices/playerSettings";
// import {disableSettings, enableSettings} from "../gameState/storeSlices/playerSettings";

function WaveCounterComponent() {
  const { currentWave, zoneId, autoWaveProgression } = useSelector((state: GameState) => state.battleState)
  const playerSkills = useSelector((state: GameState) => state.playerSkills)
  const dispatch = useDispatch()
  const currentZoneProgression = useSelector(selectZoneProgression(zoneId)) || {}

  const { maxWave, enemiesPerWave, nextZoneId, previousZoneId } = ZONES_DATA[zoneId]
  const currentKillCount = currentZoneProgression[currentWave] ?? 0
  const _isMaxWave = isMaxWave(currentWave, maxWave)

  const previous = () => {
    thunkDispatch(previousWave)
  }

  const next = () => {
    thunkDispatch(nextWave)
  }

  const canShowPreviousButton = currentWave > 1 || previousZoneId
  const canShowNextButton =
    (currentKillCount >= enemiesPerWave && !_isMaxWave) || (_isMaxWave && currentKillCount > 0 && nextZoneId)

  const _handleAutoProgression = () => {
    dispatch(handleAutoProgression())
  }

  return (
    <div className=" ms-auto text-2xl  px-1 rounded-md flex flex-col ">
      <div className="flex justify-center items-center">
        {canShowPreviousButton ? (
          <button
            className="select-none border bg-zinc-800 bg-opacity-80 text-yellow-500 flex items-center justify-center  px-1 w-8 cursor-pointer hover:bg-yellow-500 hover:text-black rounded-md"
            onClick={() => previous()}
          >
            {'<'}
          </button>
        ) : null}
        <span className={`w-52 text-center ${_isMaxWave ? 'text-yellow-500' : 'text-white'} px-2`}>
          Wave: {currentWave}/{maxWave}
        </span>
        {canShowNextButton ? (
          <button
            className="select-none border bg-zinc-800 bg-opacity-80 text-yellow-500 flex items-center justify-center px-1 w-8 cursor-pointer hover:bg-yellow-500 hover:text-black  rounded-md"
            onClick={() => next()}
          >
            {'>'}
          </button>
        ) : null}
      </div>
      {playerSkills[SkillIds.autoWaveProgression] ? (
        <div className="flex justify-end items-center px-1 gap-2">
          <label htmlFor="auto-wave">Auto:</label>
          <input
            id="auto-wave"
            type="checkbox"
            onChange={_handleAutoProgression}
            className="w-5 h-5 border-none"
            checked={autoWaveProgression ? true : false}
          ></input>
        </div>
      ) : null}
    </div>
  )
}

export default WaveCounterComponent
