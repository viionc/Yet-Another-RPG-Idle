import {useSelector} from "react-redux";
import ITEM_DATA from "../../data/itemsData";
import QUEST_DATA from "../../data/questsData";
import {RootState} from "../../gameState/store";
import ENEMIES_DATA from "../../data/enemiesData";
import ZONES_DATA from "../../data/zonesData";
import {SpecialResponseProps} from "../../data/dialogues/types";

type DialogueSpecialOptionProps = {
    special: SpecialResponseProps;
};

function DialogueSpecialOption({special}: DialogueSpecialOptionProps) {
    const {quests} = useSelector((state: RootState) => state.dialogues);
    if (special.type === "quest" && special.start) {
        const quest = QUEST_DATA[special.id];
        return <span className="ml-4 text-cyan-500 group-hover:text-black">Starts {quest.name} Quest</span>;
    }
    if (special.type === "quest") {
        const quest = QUEST_DATA[special.id];
        const step = quests[special.id];
        const {requirement} = quest.steps[step];
        let text = "";
        switch (requirement.type) {
            case "enemy":
                text = `${requirement.amount} ${ENEMIES_DATA[requirement.id].name} Killed`;
                break;
            case "item":
                text = `${requirement.amount} ${ITEM_DATA[requirement.name].name}`;
                break;
            case "stat":
                text = `${requirement.amount} ${requirement.label}`;
                break;
            case "quest":
                text = `${QUEST_DATA[requirement.id].name} Completed`;
                break;
            case "wave":
                text = `${requirement.amount} killcount on wave ${requirement.wave} in ${ZONES_DATA[requirement.zoneId].name}`;
        }

        return <span className="ml-4 text-cyan-500 group-hover:text-black">Requires {text}</span>;
    }
    if (special.type === "item") {
        const item = ITEM_DATA[special.name];
        return (
            <span className="ml-4 text-green-600 group-hover:text-black">
                Requires: {special.amount} {item.name}
            </span>
        );
    }

    return (
        <span className="ml-4 text-yellow-500 group-hover:text-black">
            Costs {special.amount} {special.label}
        </span>
    );
}

export default DialogueSpecialOption;
