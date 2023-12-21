import InventorySlot from "./InventorySlot";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import {moveItemsInInventory, sortInventory} from "../../gameState/storeSlices/playerInventory";
import {useEffect, useState} from "react";

function InventoryPanel() {
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
    const [targetIndex, setTargetIndex] = useState<null | number>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const playerInventory = useSelector((state: RootState) => state.playerInventory);
    const dispatch = useDispatch();
    const handleSort = () => {
        dispatch(sortInventory());
    };

    useEffect(() => {
        if (selectedIndex === null || targetIndex === null) return;
        console.log(selectedIndex, targetIndex);
        dispatch(moveItemsInInventory({selectedIndex, targetIndex}));
        setSelectedIndex(null);
        setTargetIndex(null);
    }, [targetIndex, selectedIndex]);

    return (
        <section className="col-start-2 col-span-2 row-start-3 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[20rem] flex flex-col items-center">
            <div className="w-full">
                <button className="border rounded-md px-1 mb-2 hover:bg-yellow-500 hover:text-black cursor-pointer" onClick={handleSort}>
                    Sort
                </button>
            </div>
            <div className="grid grid-cols-10 grid-rows-4 h-full gap-2 w-full">
                {playerInventory.map((item, index) => (
                    <InventorySlot
                        key={index}
                        item={item}
                        inventoryIndex={index}
                        setSelectedIndex={setSelectedIndex}
                        setTargetIndex={setTargetIndex}
                        setIsDragging={setIsDragging}
                        isDragging={isDragging}></InventorySlot>
                ))}
            </div>
        </section>
    );
}

export default InventoryPanel;
