import {SpecialItemResponseProps, SpecialQuestResponseProps, SpecialStatResponseProps} from "../data/dialogues/types";
import QUEST_DATA from "../data/questsData";

type DialogueSpecialOptionProps = {
    special: SpecialItemResponseProps | SpecialQuestResponseProps | SpecialStatResponseProps;
};

function DialogueSpecialOption({special}: DialogueSpecialOptionProps) {
    if (special.type === "quest") {
        const quest = QUEST_DATA[special.id];
        return <span className="ml-4 text-cyan-500 group-hover:text-black">Starts {quest.name} Quest</span>;
    }

    return (
        <span className="ml-4 text-yellow-500 group-hover:text-black">
            Cost: {special.amount} {special.label}
        </span>
    );
}

export default DialogueSpecialOption;
