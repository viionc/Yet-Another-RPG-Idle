import {useSelector} from "react-redux";
import InventorySlot from "./InventorySlot";
import {RootState} from "../gameState/store";

function PlayerEquipmentPanel() {
    const playerEquipment = useSelector((state: RootState) => state.playerEquipment);
    const equipmentArray = Object.entries(playerEquipment);

    return (
        <section className="col-span-1 col-start-4 row-start-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="mb-2 h-[10%]">Equipment:</h1>
            <div className="grid grid-cols-4 grid-rows-3 h-[85%] gap-2">
                {equipmentArray.map(([key, value], index) => (
                    <InventorySlot item={value ? {id: value, amount: 1} : null} placeholderText={key} key={index}></InventorySlot>
                ))}
            </div>
        </section>
    );
}

export default PlayerEquipmentPanel;
