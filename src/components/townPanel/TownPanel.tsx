import {useState} from "react";
import MainTownTab from "./MainTownTab";
import Tavern from "./Tavern";

export type TownTabs = "Main" | "Tavern" | "Shop" | "Exploration Guild";

function TownPanel() {
    const [townTab, setTownTab] = useState<TownTabs>("Main");

    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 col-start-2 row-start-1 row-span-2">
            <h1 className="mb-2 text-xl">town name</h1>
            {townTab === "Main" ? <MainTownTab setTownTab={setTownTab} /> : null}
            {townTab === "Tavern" ? <Tavern setTownTab={setTownTab} /> : null}
        </section>
    );
}

export default TownPanel;
