import {useState} from "react";
import ITEM_DATA, {colorsByItemTier} from "../../data/itemsData";
import {InventoryItem, addItemsToInventory} from "../../gameState/storeSlices/playerInventory";
import {useDispatch, useSelector} from "react-redux";
import {unequipItem} from "../../gameState/storeSlices/playerEquipment";
import {RootState} from "../../gameState/store";
import useTooltip from "../../hooks/useTooltip";
import Tooltip from "../Tooltip";

function EquipmentSlot({item, placeholderText}: {item: InventoryItem | null; placeholderText: string}) {
    const [show, setShow] = useState(false);
    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});
    const dispatch = useDispatch();
    const playerEquipment = useSelector((state: RootState) => state.playerEquipment);

    if (!item)
        return (
            <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col">
                <span className="text-zinc-400 text-md ">{placeholderText}</span>
            </div>
        );

    const itemData = ITEM_DATA[item.id];

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (!itemData.equipment) return;
        const equippedItem = playerEquipment[itemData.equipment.type];
        if (!equippedItem) return;
        dispatch(addItemsToInventory([{id: equippedItem, amount: 1}]));
        dispatch(unequipItem(item.id));
        setShow(false);
    };

    return (
        <div
            className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer"
            ref={refs.setReference}
            {...getReferenceProps()}
            onContextMenu={(e) => handleRightClick(e)}
            style={{
                boxShadow: `${colorsByItemTier[itemData.tier]} 0px 3px 8px`,
            }}>
            <img src={itemData.url} className="h-7" alt={`${name} item`}></img>
            {!placeholderText ? <span>{item.amount}</span> : null}
            {show ? (
                <Tooltip itemData={itemData} setFloating={refs.setFloating} floatingStyles={floatingStyles} getFloatingProps={getFloatingProps} />
            ) : null}
        </div>
    );
}

export default EquipmentSlot;
