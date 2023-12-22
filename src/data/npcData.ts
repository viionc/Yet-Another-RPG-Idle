import BARTENDER_DIALOGUES from "./dialogues/tavern/laHarparBartender";
import LA_HARPAR_JOSH from "./dialogues/tavern/laHarparJosh";
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
        name: "Bartender",
        url: "./avatars/laHarparBartender.png",
        dialogues: BARTENDER_DIALOGUES,
    },
    1: {
        id: 1,
        name: "Josh",
        url: "./avatars/laHarparJosh.png",
        dialogues: LA_HARPAR_JOSH,
    },
};
export default NPC_Data;
