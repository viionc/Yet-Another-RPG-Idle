import CloseButton from "../CloseButton";
import NpcAvatar from "./NpcAvatar";
import {BuildingProps} from "./Town";

function Building({tab, setSelectedTab}: BuildingProps) {
    return (
        <div className="bg-no-repeat bg-center bg-cover w-full h-full rounded-md relative " style={{backgroundImage: `url(${tab.url})`}}>
            <CloseButton position="top-right" callback={() => setSelectedTab(null)} />
            <h2 className="p-4">{tab.name}</h2>
            {tab.npcIds.map((npc) => (
                <NpcAvatar key={npc.id} npc={npc} />
            ))}
        </div>
    );
}

export default Building;
