import {useState} from "react";
import QUEST_DATA from "../../data/questsData";

function QuestListElement({id, step}: {id: string; step: number}) {
    const [show, setShow] = useState(false);
    const _id = parseInt(id);
    const quest = QUEST_DATA[_id];

    return (
        <li className=" flex flex-col gap-1">
            <h3 className="text-yellow-500 cursor-pointer" onClick={() => setShow((prev) => !prev)}>
                {quest.name}
            </h3>
            {show ? <div>{quest.steps[step].description}</div> : null}
        </li>
    );
}

export default QuestListElement;
