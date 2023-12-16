import {useState} from "react";
import ITEM_DATA, {colorsByItemTier} from "../data/itemsData";
import {InventoryItem} from "../gameState/storeSlices/playerInventory";
import {usePopper} from "react-popper";

function InventorySlot({item}: {item: InventoryItem | null}) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);

    if (!item) return <div className="border h-[60px] flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>;
    const {tier, url, name} = ITEM_DATA[item.id];
    return (
        <div
            className="border h-[60px] flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"
            ref={setReferenceElement}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            style={{
                boxShadow: `${colorsByItemTier[tier]} 0px 3px 8px`,
                //boxShadow: `${colorsByItemTier[tier]} 0px 5px 15px`,
                //boxShadow: `${colorsByItemTier[tier]} 0px 2px 4px 0px, ${colorsByItemTier[tier]} 0px 2px 16px 0px`,
                //boxShadow: `${colorsByItemTier[tier]} 0px 0px 0px 2px, ${colorsByItemTier[tier]} 0px 4px 6px -1px, ${colorsByItemTier[tier]} 0px 1px 0px inset`,
            }}>
            <img src={`./items/${url}`} className="h-7"></img>
            <span>{item.amount}</span>
            {show ? (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="p-1 bg-zinc-700 rounded-md border border-slate-800">
                    {name}
                </div>
            ) : null}
        </div>
    );
}

export default InventorySlot;
