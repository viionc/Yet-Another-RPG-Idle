import InventorySlot from "./InventorySlot";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import {sortInventory} from "../../gameState/storeSlices/playerInventory";

function InventoryPanel() {
    const playerInventory = useSelector((state: RootState) => state.playerInventory);
    const dispatch = useDispatch();
    const handleSort = () => {
        dispatch(sortInventory());
    };

    return (
        <section className="col-start-2 col-span-2 row-start-3 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem] flex flex-col items-center">
            <div className="w-full">
                <button className="border rounded-md px-1 mb-2 hover:bg-yellow-500 hover:text-black cursor-pointer" onClick={handleSort}>
                    Sort
                </button>
            </div>
            <div className="grid grid-cols-10 grid-rows-4 h-full gap-2 w-full">
                {playerInventory.map((item, index) => (
                    <InventorySlot key={index} item={item}></InventorySlot>
                ))}
            </div>
        </section>
    );
}

export default InventoryPanel;
