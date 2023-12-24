import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import QuestListElement from "./QuestListElement";

function QuestsPanel() {
    const [filter, setFilter] = useState("Started");

    const {quests: questProgress} = useSelector((state: RootState) => state.dialogues);
    const questEntries = Object.entries(questProgress);
    const startedQuests = questEntries.filter(([, progress]) => progress >= 0);
    const completedQuests = questEntries.filter(([, progress]) => progress === -1);

    return (
        <section className="col-span-1 col-start-4 row-start-2 row-span-2 border rounded-md p-2 border-slate-800 bg-neutral-800 ">
            <h1 className="mb-2">Quests:</h1>
            <div className="w-full flex gap-2 mb-2">
                <button className="w-full px-1 py-1 border rounded-md hover:bg-yellow-500 hover:text-black" onClick={() => setFilter("Started")}>
                    Started
                </button>
                <button className="w-full px-1 py-1 border rounded-md hover:bg-yellow-500 hover:text-black" onClick={() => setFilter("Completed")}>
                    Completed
                </button>
            </div>
            {filter === "Started" ? (
                <ul>
                    {startedQuests.map(([id]) => (
                        <QuestListElement key={id} id={id} step={questProgress[parseInt(id)]} type="started" />
                    ))}
                </ul>
            ) : (
                <ul>
                    {completedQuests.map(([id]) => (
                        <QuestListElement key={id} id={id} step={questProgress[parseInt(id)]} type="completed" />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default QuestsPanel;
