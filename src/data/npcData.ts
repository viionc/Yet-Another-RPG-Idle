import BARTENDER_DIALOGUES from "./dialogues/tavern/bartender";
import {DialogueProps} from "./dialogues/types";

export type NPCProps = {
    id: number;
    name: string;
    url: string;
    dialogues: DialogueProps[];
};

const NPC_Data: Record<number, NPCProps> = {
    0: {
        id: 0,
        name: "bartender",
        url: "./avatars/bartender.png",
        dialogues: BARTENDER_DIALOGUES,
    },
};
export default NPC_Data;
