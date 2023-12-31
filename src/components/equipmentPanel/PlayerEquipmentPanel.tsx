import {useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import EquipmentSlot from "./EquipmentSlot";

function PlayerEquipmentPanel() {
    const playerEquipment = useSelector((state: RootState) => state.playerEquipment);
    const equipmentArray = Object.entries(playerEquipment);

    return (
        <section className="col-span-1 col-start-4 row-start-1 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="mb-2 h-[10%]">Equipment:</h1>
            <div className="grid grid-cols-5 grid-rows-3 h-[85%] gap-2 w-full text-xs">
                {equipmentArray.map(([key, value], index) => (
                    <EquipmentSlot item={value ? {name: value, amount: 1} : null} placeholderText={key} key={index}></EquipmentSlot>
                ))}
            </div>
        </section>
    );
}

export default PlayerEquipmentPanel;
