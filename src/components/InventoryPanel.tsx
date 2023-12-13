import InventorySlot from "./InventorySlot";
import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";

function InventoryPanel() {
    const playerInventory = useSelector((state: RootState) => state.playerInventory);
    return (
        <section className="col-start-2 col-span-2 row-start-2 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem] flex items-center">
            <div className="grid grid-cols-10 grid-rows-4 gap-2 w-full">
                {playerInventory.map((item, index) => (
                    <InventorySlot key={index} item={item}></InventorySlot>
                ))}
            </div>
        </section>
    );
}

export default InventoryPanel;
