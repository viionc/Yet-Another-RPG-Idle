import {useState} from "react";
import Town from "./Town";

function TownsPanel() {
    const [selectedTownId, setSelectedTownId] = useState<null | number>(null);
    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 col-start-2 row-start-1 row-span-2 relative">
            {selectedTownId === null ? (
                <>
                    <h1 className="mb-2 text-xl">Towns:</h1>
                    <button onClick={() => setSelectedTownId(0)} className="px-2 py-1 text-lg border rounded-md hover:bg-yellow-500 hover:text-black">
                        La Harpar
                    </button>
                </>
            ) : (
                <Town selectedTownId={selectedTownId} close={() => setSelectedTownId(null)} />
            )}
        </section>
    );
}

export default TownsPanel;
