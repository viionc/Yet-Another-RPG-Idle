import { useState } from 'react'
import ITEM_DATA from '../../data/itemsData'
import useTooltip from '../../hooks/useTooltip'
import Tooltip from '../tooltip/Tooltip'
import { colorsByItemTier } from '../../consts/item'
import { EquipmentInventoryItem } from '../../consts/interfaces/inventory-item.interfaces'
import { thunkDispatch } from '../../store'
import { unequipItemThunk } from '../../store/player-equipment/player-equipment.thunks'
import { EquipmentItem } from '../../consts/interfaces/item.interfaces'

function EquipmentSlot({ item, placeholderText }: { item: EquipmentInventoryItem | null; placeholderText: string }) {
  const [show, setShow] = useState(false)
  const { refs, floatingStyles, getFloatingProps, getReferenceProps } = useTooltip({ show, setShow })

  if (!item)
    return (
      <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col">
        <span className="text-zinc-400 text-md ">{placeholderText}</span>
      </div>
    )

  const itemData = ITEM_DATA[item.id] as EquipmentItem

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    thunkDispatch(unequipItemThunk(itemData.slot))
  }

  return (
    <div
      className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer"
      ref={refs.setReference}
      {...getReferenceProps()}
      onContextMenu={(e) => handleRightClick(e)}
      style={{
        boxShadow: `${colorsByItemTier[itemData.tier]} 0px 3px 8px`,
      }}
    >
      <img
        src={itemData.url}
        className="h-7"
        alt={`${name} item`}
      ></img>
      {!placeholderText ? <span>{item.amount}</span> : null}
      {show ? (
        <Tooltip
          data={{ type: 'item', item: itemData }}
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
        />
      ) : null}
    </div>
  )
}

export default EquipmentSlot
