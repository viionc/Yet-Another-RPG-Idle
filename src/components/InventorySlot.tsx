import ITEM_DATA from "../data/itemsData";
import {InventoryItem} from "../gameState/storeSlices/playerInventory";

function InventorySlot({item}: {item: InventoryItem | null}) {
    return (
        <div className="border h-[60px] flex justify-center items-center rounded-md border-zinc-600 bg-zinc-800 flex-col">
            {item !== null ? (
                <>
                    <img src={`./items/${ITEM_DATA[item.id].url}`}></img>
                    <span>{item.amount}</span>
                </>
            ) : null}
        </div>
    );
}

export default InventorySlot;
