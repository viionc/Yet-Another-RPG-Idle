import {useEffect, useState} from "react";
import Building from "./Building";
import TOWNS_DATA, {TownBuildingProps} from "../../data/townsData";
import TownBuildingSelection from "./TownBuildingSelection";
import Shop from "./Shop";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import {closeShopTab} from "../../gameState/storeSlices/dialogues";
import {unlock} from "../../gameState/storeSlices/playerUnlockedContent";

type TownProps = {
    selectedTownId: number;
    close: () => void;
};

export type BuildingProps = {
    setSelectedTab: React.Dispatch<React.SetStateAction<TownBuildingProps | null>>;
    tab: TownBuildingProps;
};

function Town({selectedTownId, close}: TownProps) {
    const [selectedTab, setSelectedTab] = useState<null | TownBuildingProps>(null);
    const townData = TOWNS_DATA[selectedTownId];
    const dispatch = useDispatch();

    const {shopOpen} = useSelector((state: RootState) => state.dialogues);
    const {unlocked} = useSelector((state: RootState) => state.playerUnlockedContent);

    useEffect(() => {
        if (shopOpen) {
            const shopTab = townData.buildings.find((tab) => tab.name === "Shop");
            if (shopTab) {
                setSelectedTab(shopTab);
                return;
            }
        }
        setSelectedTab(null);
    }, [shopOpen, townData.buildings]);

    useEffect(() => {
        dispatch(closeShopTab());
        setSelectedTab(null);
    }, [dispatch]);

    const closeShop = () => {
        dispatch(closeShopTab());
    };

    useEffect(() => {
        if (selectedTab?.name === "Shop" && !unlocked.shops) dispatch(unlock("shops"));
    }, [dispatch, selectedTab?.name, unlocked.shops]);

    return (
        <div className="h-full w-full bg-center bg-cover bg-no-repeat rounded-md" style={{backgroundImage: `url(${townData.url})`}}>
            {selectedTab === null ? (
                <TownBuildingSelection setSelectedTab={setSelectedTab} buildings={townData.buildings} townName={townData.name} close={close} />
            ) : null}
            {selectedTab && selectedTab.name === "Tavern" ? <Building setSelectedTab={setSelectedTab} tab={selectedTab} /> : null}
            {selectedTab && selectedTab.name === "Market" ? <Building setSelectedTab={setSelectedTab} tab={selectedTab} /> : null}
            {selectedTab && selectedTab.name === "Shop" ? <Shop closeShop={closeShop} tab={selectedTab} id={selectedTownId} /> : null}
        </div>
    );
}

export default Town;
