import {useState} from "react";

function QuestsPanel() {
    const [, setFilter] = useState("Started");
    return (
        <section className="col-span-1 col-start-4 row-start-3 border rounded-md p-2 border-slate-800 bg-neutral-800 ">
            <h1 className="mb-2">Quests:</h1>
            <div className="w-full flex gap-2">
                <button className="w-full px-1 py-1 border rounded-md hover:bg-yellow-500 hover:text-black" onClick={() => setFilter("Started")}>
                    Started
                </button>
                <button className="w-full px-1 py-1 border rounded-md hover:bg-yellow-500 hover:text-black" onClick={() => setFilter("Completed")}>
                    Completed
                </button>
            </div>
        </section>
    );
}

export default QuestsPanel;
