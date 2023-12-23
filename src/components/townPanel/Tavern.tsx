import CloseButton from "../CloseButton";
import {TownBuildingProps} from "../../data/townsData";
import NpcAvatar from "./NpcAvatar";

type BuildingProps = {
    close: () => void;
    tab: TownBuildingProps;
};

function Tavern({tab, close}: BuildingProps) {
    return (
        <div className="bg-no-repeat bg-center bg-cover w-full h-full rounded-md relative " style={{backgroundImage: `url(${tab.url})`}}>
            <CloseButton position="top-right" callback={close} />
            <h2 className="p-4">{tab.name}</h2>
            {tab.npcIds.map((npc) => (
                <NpcAvatar npc={npc} />
            ))}
        </div>
    );
}

export default Tavern;
