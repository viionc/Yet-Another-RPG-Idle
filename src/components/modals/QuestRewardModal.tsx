import {useDispatch} from "react-redux";
import {hideQuestCompletedPopUp} from "../../gameState/storeSlices/dialogues";
import QUEST_DATA from "../../data/questsData";
import ITEM_DATA from "../../data/itemsData";
import CloseButton from "../CloseButton";

function QuestRewardModal({id}: {id: number}) {
    const dispatch = useDispatch();

    const close = () => dispatch(hideQuestCompletedPopUp());
    const {name, rewards} = QUEST_DATA[id];
    return (
        <article
            className="absolute top-0 left-0 bg-opacity-25 bg-black border-slate-800 w-full h-full text-white flex justify-center items-center z-[250]"
            onClick={close}>
            <div
                className="bg-zinc-800 min-h-[33%] w-1/3 mb-52 p-6 rounded-md border-slate-700 border relative z-[110]"
                onClick={(e) => e.stopPropagation()}>
                <CloseButton callback={close} position="top-right" />
                <h1 className="text-2xl text-yellow-500 mb-6">{name} Completed!</h1>
                <h2 className="mb-2">Rewards:</h2>
                <ul className="flex flex-col gap-2">
                    {rewards.map((reward, index) => {
                        if (reward.type === "item") {
                            const {name: itemName} = ITEM_DATA[reward.name];
                            return (
                                <li key={index}>
                                    {reward.amount} {itemName}
                                </li>
                            );
                        } else if (reward.type === "stat") {
                            return (
                                <li key={index}>
                                    {reward.amount} {reward.label}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </article>
    );
}

export default QuestRewardModal;
