import {useState} from "react";
import ITEM_DATA from "../data/itemsData";
import {InventoryItem} from "../gameState/storeSlices/playerInventory";
import {usePopper} from "react-popper";

function InventorySlot({item}: {item: InventoryItem | null}) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);
    return (
        <div
            className="border h-[60px] flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"
            ref={setReferenceElement}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}>
            {item !== null ? (
                <>
                    <img src={`./items/${ITEM_DATA[item.id].url}`} className="h-7"></img>
                    <span>{item.amount}</span>
                    {show ? (
                        <div
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                            className="p-1 bg-zinc-700 rounded-md border border-slate-800">
                            {ITEM_DATA[item.id].name}
                        </div>
                    ) : null}
                </>
            ) : null}
        </div>
    );
}

export default InventorySlot;
