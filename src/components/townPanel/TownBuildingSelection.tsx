import {useDispatch} from "react-redux";
import {TownBuildingProps, TownNames} from "../../data/townsData";
import {openShopTab} from "../../gameState/storeSlices/dialogues";

type TownBuildingSelectionProps = {
    buildings: TownBuildingProps[];
    setSelectedTab: React.Dispatch<React.SetStateAction<TownBuildingProps | null>>;
    townName: TownNames;
    close: () => void;
};

function TownBuildingSelection({buildings, setSelectedTab, townName, close}: TownBuildingSelectionProps) {
    const dispatch = useDispatch();
    const handleClick = (tab: TownBuildingProps) => {
        setSelectedTab(tab);
        if (tab.name === "Shop") dispatch(openShopTab());
    };
    return (
        <div className="flex flex-col gap-2 w-full p-4">
            <h1 className="mb-2 text-xl">{townName}</h1>
            {buildings.map((tab) => (
                <button
                    key={tab.name}
                    onClick={() => handleClick(tab)}
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
