import { useState } from 'react'
import ITEM_DATA from '../../data/itemsData'
import { thunkDispatch } from '../../store'
import useTooltip from '../../hooks/useTooltip'
import Tooltip from '../tooltip/Tooltip'
import { colorsByItemTier } from '../../consts/item'
import { equipItemThunk } from '../../store/player-inventory/player-inventory.thunks'
import { ItemType } from '../../consts/enums/item-type.enum'
import { InventoryItemType } from '../../consts/interfaces/inventory-item.interfaces'

export type InventorySlotProps = {
  item: InventoryItemType | null
}

function InventorySlot({ item }: InventorySlotProps) {
  const [show, setShow] = useState(false)

  const { refs, floatingStyles, getFloatingProps, getReferenceProps } = useTooltip({ show, setShow })

  if (!item) {
    return (
      <div className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>
    )
  }

  const itemData = ITEM_DATA[item.id]

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    if (item.type === ItemType.equipment) thunkDispatch(equipItemThunk(item.uniqueId))

    setShow(false)
  }

  // const handleUsableItem = (usable: UseItemStatProps) => {
  //   // switch (usable.type) {
  //   //   case UsableItemType.stat:
  //   //     dispatch(increaseStats([{ id: usable.id, amount: usable.amount }]))
  //   //     dispatch(removeItemsFromInventory([{ id: item.id, amount: 1 }]))
  //   // }
  // }

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
        className="h-8 w-8 object-contain"
        alt={`${name} item`}
      ></img>
      <span>{item.amount}</span>

      {show ? (
        <Tooltip
          data={{ type: 'item', item }}
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
        />
      ) : null}
    </div>
  )
}

export default InventorySlot
