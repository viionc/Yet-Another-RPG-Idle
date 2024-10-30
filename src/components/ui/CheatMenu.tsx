import { useDispatch, useSelector } from 'react-redux'
import ZONES_DATA from '../../data/zonesData'
import { GameState, resetAction } from '../../store'
import { changeWave } from '../../store/battle-state'
import { addItemsToInventory } from '../../store/player-inventory'
import { increaseStats } from '../../store/player-stats'
import uuid from '../../consts/uuid'
import { ItemIds } from '../../consts/enums/ids/item-ids.enum'
import { PlayerStatIds } from '../../consts/enums/ids/player-stat-ids'
import { ItemType } from '../../consts/enums/item-type.enum'

function CheatMenu() {
  const dispatch = useDispatch()
  const { zoneId } = useSelector((state: GameState) => state.battleState)

  return (
    <div className="absolute top-24 left-1 flex flex-col gap-2 max-w-[100px] text-xs">
      <button
        className="text-red-500 border hover:text-white"
        onClick={() => dispatch(resetAction())}
      >
        Reset All
      </button>
      <button
        className="text-red-500 border hover:text-white "
        onClick={() =>
          dispatch(
            addItemsToInventory([
              {
                id: ItemIds.knife,
                amount: 1,
                type: ItemType.equipment,
                stats: [{ id: PlayerStatIds.attackPower, amount: 4 }],
                uniqueId: uuid(),
              },
            ]),
          )
        }
      >
        add knife
      </button>
      <button
        className="text-red-500 border hover:text-white"
        onClick={() =>
          dispatch(
            addItemsToInventory([
              {
                id: ItemIds.slimeGoldenCrown,
                amount: 1,
                type: ItemType.equipment,
                stats: [{ id: PlayerStatIds.goldCoinsMultiplier, amount: 0.25 }],
                uniqueId: uuid(),
              },
            ]),
          )
        }
      >
        add crown
      </button>
      <button
        className="text-red-500 border hover:text-white"
        onClick={() => dispatch(changeWave(ZONES_DATA[zoneId].maxWave))}
      >
        skip to boss
      </button>
      <button
        className="text-red-500 border hover:text-white"
        onClick={() => dispatch(increaseStats([{ id: PlayerStatIds.unspentSkillPoints, amount: 10 }]))}
      >
        add 10 skill points
      </button>
      <button
        className="text-red-500 border hover:text-white"
        onClick={() => dispatch(increaseStats([{ id: PlayerStatIds.goldCoins, amount: 10000 }]))}
      >
        add 10k coins
      </button>
      <button
        className="text-red-500 border hover:text-white"
        onClick={() => dispatch(addItemsToInventory([{ id: ItemIds.crabMeat, amount: 100, type: ItemType.resource }]))}
      >
        add 100 crab meat
      </button>
      <button
        className="text-red-500 border hover:text-white"
        onClick={() =>
          dispatch(
            increaseStats([
              { id: PlayerStatIds.extraAirDamage, amount: 1 },
              { id: PlayerStatIds.extraDarkDamage, amount: 1 },
              { id: PlayerStatIds.extraEarthDamage, amount: 1 },
              { id: PlayerStatIds.extraFireDamage, amount: 1 },
              { id: PlayerStatIds.extraLightDamage, amount: 1 },
              { id: PlayerStatIds.extraPhysicalDamage, amount: 1 },
              { id: PlayerStatIds.extraWaterDamage, amount: 1 },
            ]),
          )
        }
      >
        increase elemental stats
      </button>
    </div>
  )
}

export default CheatMenu
