import BARTENDER_DIALOGUES from "./tavern/bartender";
import {DialogueProps} from "./types";

export type DialogueConstants = Record<string, DialogueProps[]>;

const dialoguesConstants: DialogueConstants = {
    "bartender": BARTENDER_DIALOGUES,
};

export default dialoguesConstants;
