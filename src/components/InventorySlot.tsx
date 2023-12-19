import {useState} from "react";
import ITEM_DATA, {colorsByItemTier} from "../data/itemsData";
import {InventoryItem, addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {usePopper} from "react-popper";
import {useDispatch, useSelector} from "react-redux";
import {equipItem, unequipItem} from "../gameState/storeSlices/playerEquipment";
import {RootState} from "../gameState/store";

function InventorySlot({item, placeholderText}: {item: InventoryItem | null; placeholderText?: string}) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const playerEquipment = useSelector((state: RootState) => state.playerEquipment);

    if (!item)
        return (
            <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col">
                {placeholderText ? <span className="text-zinc-400 text-md ">{placeholderText}</span> : null}
            </div>
        );

    const {tier, url, name, equipment} = ITEM_DATA[item.id];
    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (equipment) {
            const equippedItem = playerEquipment[equipment.type];
            if (equippedItem) dispatch(addItemsToInventory([{id: equippedItem, amount: 1}]));
            placeholderText ? dispatch(unequipItem(item.id)) : dispatch(equipItem(item.id));
            setShow(false);
        }
    };

    const rightClickText = placeholderText ? "Unequip" : "Equip";

    return (
        <div
            className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer"
            ref={setReferenceElement}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onContextMenu={(e) => handleRightClick(e)}
            style={{
                boxShadow: `${colorsByItemTier[tier]} 0px 3px 8px`,
                //boxShadow: `${colorsByItemTier[tier]} 0px 5px 15px`,
                //boxShadow: `${colorsByItemTier[tier]} 0px 2px 4px 0px, ${colorsByItemTier[tier]} 0px 2px 16px 0px`,
                //boxShadow: `${colorsByItemTier[tier]} 0px 0px 0px 2px, ${colorsByItemTier[tier]} 0px 4px 6px -1px, ${colorsByItemTier[tier]} 0px 1px 0px inset`,
            }}>
            <img src={`./items/${url}`} className="h-7"></img>
            {!placeholderText ? <span>{item.amount}</span> : null}

            {show ? (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="p-1 bg-zinc-700 rounded-md border border-slate-800 flex gap-1 flex-col cursor-default select-none">
                    <span>{name}</span>
                    <span className="text-xs" style={{color: colorsByItemTier[tier]}}>
                        {tier} {equipment ? equipment.type : null}
                    </span>
                    {equipment ? (
                        <>
                            <ul className="flex flex-col text-sm">
                                {equipment.stats.map((stat) => (
                                    <li key={stat.type}>{stat.description}</li>
                                ))}
                            </ul>
                            <span className="flex gap-1 ms-auto items-center text-xs">
                                {rightClickText}
                                <img src="./other/rightClick.png" alt={`right click to ${rightClickText}`} height={16} width={16}></img>
                            </span>
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default InventorySlot;
