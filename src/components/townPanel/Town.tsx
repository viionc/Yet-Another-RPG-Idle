import {useState} from "react";
import Tavern from "./Tavern";
import TOWNS_DATA, {TownBuildingProps} from "../../data/townsData";
import TownBuildingSelection from "./TownBuildingSelection";
import CloseButton from "../CloseButton";

type TownProps = {
    selectedTownId: number;
    close: () => void;
};

function Town({selectedTownId, close}: TownProps) {
    const [selectedTab, setSelectedTab] = useState<null | TownBuildingProps>(null);
    const townData = TOWNS_DATA[selectedTownId];

    return (
        <>
            {selectedTab === null ? (
                <>
                    <CloseButton callback={close} position="top-right"></CloseButton>
                    <TownBuildingSelection
                        setSelectedTab={setSelectedTab}
                        buildings={townData.buildings}
                        townName={townData.name}></TownBuildingSelection>
                </>
            ) : null}
            {selectedTab && selectedTab.name === "Tavern" ? <Tavern close={() => setSelectedTab(null)} tab={selectedTab} /> : null}
        </>
    );
}

export default Town;
