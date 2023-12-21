import {createPortal} from "react-dom";
import NPC_Data from "../data/npcData";
import {useDispatch, useSelector} from "react-redux";
import CloseButton from "./CloseButton";
import {closeDialogue, nextDialogueMessage} from "../gameState/storeSlices/dialogues";
import {RootState} from "../gameState/store";

function DialogueModal({id}: {id: number}) {
    const dispatch = useDispatch();
    const {npcDialoguesProgress} = useSelector((state: RootState) => state.dialogues);
    const npc = NPC_Data[id];

    if (!npc || npcDialoguesProgress[id] < 0) return;
    const message = npc.dialogues[npcDialoguesProgress[id]].message;
    const options = npc.dialogues[npcDialoguesProgress[id]].options;

    const close = () => {
        dispatch(closeDialogue());
    };

    const next = (nextId: number) => {
        dispatch(nextDialogueMessage(nextId));
    };

    return createPortal(
        <article
            className="absolute top-0 left-0 bg-opacity-25 bg-black border-slate-800 w-full h-full text-white flex justify-center items-center z-[100]"
            onClick={close}>
            <div className="bg-zinc-800 h-1/3 w-1/2 p-6 rounded-md border-slate-700 border relative" onClick={(e) => e.stopPropagation()}>
                <CloseButton position="top-right" callback={close}></CloseButton>
                <h2 className="text-yellow-500 text-2xl mb-2">{npc.name}</h2>
                <p className="mb-8 text-xl">{message}</p>
                <ul className="flex flex-col gap-2">
                    {options.map((options, index) => (
                        <li
                            key={index}
                            onClick={() => next(options.next)}
                            className="border px-1 py-2 hover:bg-yellow-500 hover:text-black rounded-md cursor-pointer">
                            {options.response}
                        </li>
                    ))}
                </ul>
            </div>
        </article>,
        document.getElementById("dialogue-modal") as HTMLElement
    );
}

export default DialogueModal;
