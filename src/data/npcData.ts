import LA_HARPAR_BARTENDER from "./dialogues/laHarparTown/laHarparBartender";
import LA_HARPAR_ELARA from "./dialogues/laHarparTown/laHarparElara";
import LA_HARPAR_JOSH from "./dialogues/laHarparTown/laHarparJosh";
import LA_HARPAR_TRADER from "./dialogues/laHarparTown/laHarparTrader";
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
        url: "./avatars/laHarpar/laHarparBartender.png",
        dialogues: LA_HARPAR_BARTENDER,
    },
    1: {
        id: 1,
        name: "Josh",
        url: "./avatars/laHarpar/laHarparJosh.png",
        dialogues: LA_HARPAR_JOSH,
    },
    2: {
        id: 2,
        name: "Trader",
        url: "./avatars/laHarpar/laHarparTrader.png",
        dialogues: LA_HARPAR_TRADER,
    },
    3: {
        id: 3,
        name: "Elara",
        url: "./avatars/laHarpar/laHarparElara.png",
        dialogues: LA_HARPAR_ELARA,
    },
};
export default NPC_Data;
