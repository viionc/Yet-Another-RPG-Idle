import React from "react";
import {TownTabs} from "./TownPanel";

function MainTownTab({setTownTab}: {setTownTab: React.Dispatch<React.SetStateAction<TownTabs>>}) {
    return (
        <article className="w-1/2 flex flex-col gap-2">
            <button className="border rounded-md hover:bg-yellow-500 hover:text-black px-1 py-2" onClick={() => setTownTab("Tavern")}>
                Tavern
            </button>
            <button className="border rounded-md hover:bg-yellow-500 hover:text-black px-1 py-2" onClick={() => setTownTab("Shop")}>
                Shop
            </button>
            <button className="border rounded-md hover:bg-yellow-500 hover:text-black px-1 py-2" onClick={() => setTownTab("Exploration Guild")}>
                Exploration Guild
            </button>
        </article>
    );
}

export default MainTownTab;
