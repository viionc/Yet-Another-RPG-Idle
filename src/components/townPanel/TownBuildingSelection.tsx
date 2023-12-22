import {TownBuildingProps, TownNames} from "../../data/townsData";

type TownBuildingSelectionProps = {
    buildings: TownBuildingProps[];
    setSelectedTab: React.Dispatch<React.SetStateAction<TownBuildingProps | null>>;
    townName: TownNames;
};

function TownBuildingSelection({buildings, setSelectedTab, townName}: TownBuildingSelectionProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <h1 className="mb-2 text-xl">{townName}</h1>
            {buildings.map((tab) => (
                <button
                    onClick={() => setSelectedTab(tab)}
                    className="px-2 w-1/2 py-1 text-lg border rounded-md hover:bg-yellow-500 hover:text-black">
                    {tab.name}
                </button>
            ))}
        </div>
    );
}
export default TownBuildingSelection;
