import ITEM_DATA from '../../data/itemsData'
import { clickableItemTypes, colorsByItemTier, tierToString } from '../../consts/item'
import { statToDescription } from '../../consts/tooltip'

import { TooltipItemType } from './Tooltip'
import { ItemType } from '../../consts/enums/item-type.enum'
type ItemTooltipInfoProps = {
  item: TooltipItemType
}

function ItemTooltipInfo({ item }: ItemTooltipInfoProps) {
  const { name, tier, description, ...itemData } = ITEM_DATA[item.id]

  const getText = () => {
    if (item.type === ItemType.equipment) return 'Equip'
    if (item.type === ItemType.rewardsStats) return 'Use'
  }

  return (
    <>
      <span className="text-lg">{name}</span>
      <span
        className="text-md"
        style={{ color: colorsByItemTier[tier] }}
      >
        {tierToString[tier]} {itemData.type === ItemType.equipment && itemData.slot}
        {/* {tier} {item.type === ItemType.equipment ? extra.slot : null} */}
      </span>
      {description ? <span>{description}</span> : null}
      {item.type === ItemType.equipment && (
        <>
          <ul className="flex flex-col text-sm">
            {item.stats.map((stat) => (
              <li key={stat.id}>{statToDescription[stat.id](stat.amount)}</li>
            ))}
          </ul>
        </>
      )}
      {clickableItemTypes.includes(item.type) && (
        <span className="flex gap-1 ms-auto items-center text-xs">
          {getText()}
          <img
            src="./other/rightClick.png"
            alt={`right click to equip`}
            height={16}
            width={16}
          ></img>
        </span>
      )}
    </>
  )
}

export default ItemTooltipInfo
