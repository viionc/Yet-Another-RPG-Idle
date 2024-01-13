import {checkIfMeetsRequirements} from "../../utils/misc";
import CloseButton from "../ui/CloseButton";
import BuildingObject from "./BuildingObject";
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
            {tab.objectsIds
                ? tab.objectsIds.map((object) => {
                      if (!checkIfMeetsRequirements(object.requirement)) return;
                      return <BuildingObject key={object.name} object={object} />;
                  })
                : null}
        </div>
    );
}

export default Building;
