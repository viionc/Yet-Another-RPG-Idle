import LA_HARPAR_BARTENDER_DIALOGUES from "./dialogues/tavern/laHarparBartender";
import LA_HARPAR_JOSH from "./dialogues/tavern/laHarparJosh";
import LA_HARPAR_TRADER_DIALOGUES from "./dialogues/tavern/laHarparTrader";
import {DialogueProps} from "./dialogues/types";

export type NPCProps = {
    id: number;
    name: string;
    url: string;
    dialogues: Record<number, DialogueProps>;
};

const NPC_Data: Record<number, NPCProps> = {
    0: {
        id: 0,
        name: "Bartender",
        url: "./avatars/laHarparBartender.png",
        dialogues: LA_HARPAR_BARTENDER_DIALOGUES,
    },
    1: {
        id: 1,
        name: "Josh",
        url: "./avatars/laHarparJosh.png",
        dialogues: LA_HARPAR_JOSH,
    },
    2: {
        id: 2,
        name: "Trader",
        url: "./avatars/laHarparTrader.png",
        dialogues: LA_HARPAR_TRADER_DIALOGUES,
    },
};
export default NPC_Data;
