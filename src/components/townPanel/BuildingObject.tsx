import { useDispatch } from 'react-redux'
import { TownBuildingObjectProps } from '../../data/townsData'
import { changeZone } from '../../store/battle-state'
import { changeSetting } from '../../store/player-settings'
import { TownObjectIds } from '../../consts/enums/ids/town-object-ids.enum'

type BuildingObjectProps = {
  object: TownBuildingObjectProps
}

function BuildingObject({ object }: BuildingObjectProps) {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (object.type === TownObjectIds.zoneEntrance) {
      dispatch(changeZone({ zoneId: object.zoneId, wave: 1 }))
      dispatch(changeSetting({ key: 'navTab', value: 'Main' }))
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`absolute ${object.position} bg-green-700 rounded-md border-slate-700 w-24 h-24 bg-opacity-60 flex justify-center items-center cursor-pointer brightness-[80%] hover:brightness-100`}
    >
      <img
        src={object.url}
        height="80"
        width="80"
        className="rounded-md"
      ></img>
    </div>
  )
}

export default BuildingObject
