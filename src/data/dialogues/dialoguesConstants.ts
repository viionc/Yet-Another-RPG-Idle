import BARTENDER_DIALOGUES from "./tavern/laHarparBartender";
import {DialogueProps} from "./types";

export type DialogueConstants = Record<string, DialogueProps[]>;

const dialoguesConstants: DialogueConstants = {
    "bartender": BARTENDER_DIALOGUES,
};

export default dialoguesConstants;
