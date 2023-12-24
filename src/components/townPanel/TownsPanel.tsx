import {useState} from "react";
import Town from "./Town";

function TownsPanel() {
    const [selectedTownId, setSelectedTownId] = useState<null | number>(null);
    return (
        <section className="border rounded-md col-span-2 border-slate-800 bg-neutral-800 col-start-2 row-start-1 row-span-2 relative">
            {selectedTownId === null ? (
                <div className="p-2 flex flex-col">
                    <h1 className="mb-2 text-xl">Towns:</h1>
                    <button
                        onClick={() => setSelectedTownId(0)}
                        className="w-1/2 px-2 py-1 text-lg border rounded-md hover:bg-yellow-500 hover:text-black">
                        La Harpar
                    </button>
                </div>
            ) : (
                <Town selectedTownId={selectedTownId} close={() => setSelectedTownId(null)} />
            )}
        </section>
    );
}

export default TownsPanel;
