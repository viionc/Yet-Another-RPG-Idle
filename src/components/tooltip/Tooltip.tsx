import React from 'react'
import { SpellProps } from '../../data/spellsData'
import SpellTooltipInfo from './SpellTooltipInfo'
import SkillTooltipInfo from './SkillTooltipInfo'
import ItemTooltipInfo from './ItemTooltipInfo'
import { InventoryItemType } from '../../consts/interfaces/inventory-item.interfaces'
import { Item } from '../../consts/interfaces/item.interfaces'

type TooltipProps = {
  data: TooltipDataProps
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>
  setFloating: (node: HTMLElement | null) => void
  floatingStyles: React.CSSProperties
}

export type TooltipItemType = InventoryItemType | Item

type TooltipDataProps = ItemData
type ItemData = {
  type: 'item'
  item: TooltipItemType
}
// type SpellData = {
//   type: 'spell'
//   spell: SpellProps
// }
// type SkillData = {
//   type: 'skill'
//   skill: SkillProps
// }

function Tooltip({ data, floatingStyles, setFloating, getFloatingProps }: TooltipProps) {
  return (
    <div
      ref={setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
      className="py-1 px-2 bg-zinc-700 rounded-md border border-slate-800 flex gap-1 flex-col cursor-default select-none"
    >
      {data.type === 'item' && <ItemTooltipInfo item={data.item} />}
      {/* {data.type === 'spell' ? <SpellTooltipInfo spell={data.spell} /> : null}
      {data.type === 'skill' ? <SkillTooltipInfo skill={data.skill} /> : null} */}
    </div>
  )
}

export default Tooltip
