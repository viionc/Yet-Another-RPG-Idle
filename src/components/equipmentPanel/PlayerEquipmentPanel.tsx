import { useSelector } from 'react-redux'
import { GameState } from '../../store'
import EquipmentSlot from './EquipmentSlot'

function PlayerEquipmentPanel() {
  const playerEquipment = useSelector((state: GameState) => state.playerEquipment)
  const equipmentArray = Object.entries(playerEquipment)

  return (
    <section className="col-span-1 col-start-4 row-start-1 p-2 bg-neutral-800 h-[20rem] shadow-md rounded-md">
      <h1 className="mb-2 h-[10%]">Equipment:</h1>
      <div className="grid grid-cols-5 grid-rows-3 h-[85%] gap-2 w-full text-xs">
        {equipmentArray.map(([slot, item], index) => (
          <EquipmentSlot
            item={item ? item : null}
            placeholderText={slot}
            key={index}
          ></EquipmentSlot>
        ))}
      </div>
    </section>
  )
}

export default PlayerEquipmentPanel
