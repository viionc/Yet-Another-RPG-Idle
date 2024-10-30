import { useEffect, useState } from 'react'
import Building from './Building'
import TOWNS_DATA, { TownBuildingProps } from '../../data/townsData'
import TownBuildingSelection from './TownBuildingSelection'
import Shop from './Shop'
import { useDispatch, useSelector } from 'react-redux'
import { GameState } from '../../store'
import { closeShopTab } from '../../store/quests-state'
import { unlock } from '../../store/player-unlocked-content'
import { TownIds } from '../../consts/enums/ids/town-ids.enum'
import { ShopIds } from '../../consts/enums/ids/shop-ids.enum'

type TownProps = {
  selectedTownId: TownIds
  close: () => void
}

export type BuildingProps = {
  setSelectedTab: React.Dispatch<React.SetStateAction<TownBuildingProps | null>>
  tab: TownBuildingProps
}

function Town({ selectedTownId, close }: TownProps) {
  const [selectedTab, setSelectedTab] = useState<null | TownBuildingProps>(null)
  const townData = TOWNS_DATA[selectedTownId]
  const dispatch = useDispatch()

  const { shopOpen } = useSelector((state: GameState) => state.dialogues)
  const { unlocked } = useSelector((state: GameState) => state.playerUnlockedContent)

  useEffect(() => {
    if (shopOpen) {
      const shopTab = townData.buildings.find((tab) => tab.name === 'Shop')
      if (shopTab) {
        setSelectedTab(shopTab)
        return
      }
    }
    setSelectedTab(null)
  }, [shopOpen, townData.buildings])

  useEffect(() => {
    dispatch(closeShopTab())
    setSelectedTab(null)
  }, [dispatch])

  const closeShop = () => {
    dispatch(closeShopTab())
  }

  useEffect(() => {
    if (selectedTab?.name === 'Shop' && !unlocked.shops) dispatch(unlock('shops'))
  }, [dispatch, selectedTab?.name, unlocked.shops])

  return (
    <div
      className="h-full w-full bg-center bg-cover bg-no-repeat rounded-md"
      style={{ backgroundImage: `url(${townData.url})` }}
    >
      {selectedTab === null ? (
        <TownBuildingSelection
          setSelectedTab={setSelectedTab}
          buildings={townData.buildings}
          townName={townData.name}
          close={close}
        />
      ) : null}
      {/* probably should refactor that later   */}
      {selectedTab && selectedTab.name === 'Tavern' ? (
        <Building
          setSelectedTab={setSelectedTab}
          tab={selectedTab}
        />
      ) : null}
      {selectedTab && selectedTab.name === 'Market' ? (
        <Building
          setSelectedTab={setSelectedTab}
          tab={selectedTab}
        />
      ) : null}
      {selectedTab && selectedTab.name === 'Exploration Guild' ? (
        <Building
          setSelectedTab={setSelectedTab}
          tab={selectedTab}
        />
      ) : null}
      {selectedTab && selectedTab.name === 'Shop' ? (
        <Shop
          closeShop={closeShop}
          tab={selectedTab}
          id={ShopIds.laHarparShop}
        />
      ) : null}
    </div>
  )
}

export default Town
