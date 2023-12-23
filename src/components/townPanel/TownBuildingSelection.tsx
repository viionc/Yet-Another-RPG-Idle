import {TownBuildingProps, TownNames} from "../../data/townsData";

type TownBuildingSelectionProps = {
    buildings: TownBuildingProps[];
    setSelectedTab: React.Dispatch<React.SetStateAction<TownBuildingProps | null>>;
    townName: TownNames;
    close: () => void;
};

function TownBuildingSelection({buildings, setSelectedTab, townName, close}: TownBuildingSelectionProps) {
    return (
        <div className="flex flex-col gap-2 w-full p-4">
            <h1 className="mb-2 text-xl">{townName}</h1>
            {buildings.map((tab) => (
                <button
                    onClick={() => setSelectedTab(tab)}
                    className="px-2 w-1/2 py-1 text-lg border rounded-md hover:bg-yellow-500 hover:text-black bg-zinc-800">
                    {tab.name}
                </button>
            ))}
            <button onClick={close} className="px-2 w-1/2 py-1 text-lg border rounded-md hover:bg-yellow-500 hover:text-black bg-zinc-800">
                Leave
            </button>
        </div>
    );
}
export default TownBuildingSelection;
