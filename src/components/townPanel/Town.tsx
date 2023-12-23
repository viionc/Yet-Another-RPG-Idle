import {useState} from "react";
import Tavern from "./Tavern";
import TOWNS_DATA, {TownBuildingProps} from "../../data/townsData";
import TownBuildingSelection from "./TownBuildingSelection";

type TownProps = {
    selectedTownId: number;
    close: () => void;
};

function Town({selectedTownId, close}: TownProps) {
    const [selectedTab, setSelectedTab] = useState<null | TownBuildingProps>(null);
    const townData = TOWNS_DATA[selectedTownId];

    return (
        <div className="h-full w-full bg-center bg-cover bg-no-repeat rounded-md" style={{backgroundImage: `url(${townData.url})`}}>
            {selectedTab === null ? (
                <TownBuildingSelection setSelectedTab={setSelectedTab} buildings={townData.buildings} townName={townData.name} close={close} />
            ) : null}
            {selectedTab && selectedTab.name === "Tavern" ? <Tavern close={() => setSelectedTab(null)} tab={selectedTab} /> : null}
            {selectedTab && selectedTab.name === "Market" ? <Tavern close={() => setSelectedTab(null)} tab={selectedTab} /> : null}
        </div>
    );
}

export default Town;
