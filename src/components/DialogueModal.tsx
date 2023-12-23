import {createPortal} from "react-dom";
import NPC_Data from "../data/npcData";
import {useDispatch, useSelector} from "react-redux";
import CloseButton from "./CloseButton";
import {closeDialogue, endQuest, nextDialogueMessage, progressQuest, startQuest} from "../gameState/storeSlices/dialogues";
import {RootState} from "../gameState/store";
import {OptionsProps} from "../data/dialogues/types";
import {decreaseStats} from "../gameState/storeSlices/playerStats";
import {removeItemsFromInventory} from "../gameState/storeSlices/playerInventory";
import DialogueSpecialOption from "./DialogueSpecialOption";

function DialogueModal({id}: {id: number}) {
    const dispatch = useDispatch();
    const {npcDialoguesProgress, questProgress} = useSelector((state: RootState) => state.dialogues);
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const playerInventory = useSelector((state: RootState) => state.playerInventory);
    const npc = NPC_Data[id];

    if (!npc || npcDialoguesProgress[id] < 0) return;
    const message = npc.dialogues[npcDialoguesProgress[id]].message;
    const options = npc.dialogues[npcDialoguesProgress[id]].options;
    const close = () => {
        dispatch(closeDialogue());
    };

    const next = (option: OptionsProps) => {
        if (option.special) {
            const {special} = option;
            switch (special.type) {
                case "stat":
                    if (playerStats[special.key] < special.amount) return;
                    dispatch(decreaseStats([{id: special.key, amount: special.amount}]));
                    break;
                case "item":
                    if (itemsInInventory(special.id) < special.amount) return;
                    dispatch(removeItemsFromInventory([{id: special.id, amount: special.amount}]));
                    break;
                case "quest":
                    if (questProgress[special.id] === undefined && special.start) dispatch(startQuest(special.id));
                    else if (special.end) dispatch(endQuest(special.id));
                    else dispatch(progressQuest(special.id));
                    break;
            }
        }
        dispatch(nextDialogueMessage(option.next));
        if (option.close) close();
    };

    const itemsInInventory = (id: number): number => {
        const item = playerInventory.find((item) => item && item.id === id);
        if (item) return item.amount;
        return -1;
    };

    return createPortal(
        <article
            className="absolute top-0 left-0 bg-opacity-25 bg-black border-slate-800 w-full h-full text-white flex justify-center items-center z-[100]"
            onClick={close}>
            <div
                className="bg-zinc-800 min-h-[33%] w-1/2 mb-52 p-6 rounded-md border-slate-700 border relative z-[110]"
                onClick={(e) => e.stopPropagation()}>
                <CloseButton position="top-right" callback={close} />
                <h2 className="text-yellow-500 text-2xl mb-2">{npc.name}</h2>
                <p className="mb-8 text-xl">{message}</p>
                <ul className="flex flex-col gap-2">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => next(option)}
                            className="group border px-2 py-2 hover:bg-yellow-500 hover:text-black rounded-md cursor-pointer">
                            {option.response}
                            {option.special ? <DialogueSpecialOption special={option.special} /> : null}
                        </li>
                    ))}
                </ul>
            </div>
        </article>,
        document.getElementById("dialogue-modal") as HTMLElement
    );
}

export default DialogueModal;
