import {useState} from "react";
import QUEST_DATA from "../../data/questsData";

function QuestListElement({id, step, type}: {id: string; step: number; type: "completed" | "started"}) {
    const [show, setShow] = useState(false);
    const _id = parseInt(id);
    const quest = QUEST_DATA[_id];

    return (
        <li className=" flex flex-col gap-1">
            <h3 className={`${type === "started" ? "text-yellow-500 cursor-pointer" : "text-green-500"} `} onClick={() => setShow((prev) => !prev)}>
                {quest.name}
            </h3>
            {type === "started" && show ? <div>{quest.steps[step].description}</div> : null}
        </li>
    );
}

export default QuestListElement;
