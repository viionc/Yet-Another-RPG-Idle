import {useState} from "react";
import ITEM_DATA, {EquipmentProps, colorsByItemTier} from "../../data/itemsData";
import {InventoryItem, addItemsToInventory} from "../../gameState/storeSlices/playerInventory";
import {useDispatch, useSelector} from "react-redux";
import {equipItem, unequipItem} from "../../gameState/storeSlices/playerEquipment";
import {RootState} from "../../gameState/store";
import useTooltip from "../../hooks/useTooltip";
import Tooltip from "../Tooltip";

export type InventorySlotProps = {
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setTargetIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    isDragging: boolean;
    inventoryIndex: number;
    item: InventoryItem | null;
};

function InventorySlot({item, inventoryIndex, setSelectedIndex, setTargetIndex, setIsDragging, isDragging}: InventorySlotProps) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const playerEquipment = useSelector((state: RootState) => state.playerEquipment);

    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});

    const handleOnMouseEnter = () => {
        if (isDragging) {
            setIsDragging(false);
            setTargetIndex(inventoryIndex);
        }
    };

    const onDragStart = () => {
        setIsDragging(true);
        setSelectedIndex(inventoryIndex);
    };

    if (!item) {
        return (
            <div
                className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"
                onMouseEnter={handleOnMouseEnter}></div>
        );
    }

    const itemData = ITEM_DATA[item.id];

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (itemData.equipment) handleEquipItem(itemData.equipment);
    };

    const handleEquipItem = (equipment: EquipmentProps) => {
        const equippedItem = playerEquipment[equipment.type];
        if (equippedItem) {
            dispatch(unequipItem(equippedItem));
            dispatch(addItemsToInventory([{id: equippedItem, amount: 1}]));
        }
        dispatch(equipItem(item.id));
        setShow(false);
    };

    return (
        <div
            className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer"
            ref={refs.setReference}
            {...getReferenceProps()}
            draggable
            onDragStart={onDragStart}
            onMouseEnter={handleOnMouseEnter}
            onContextMenu={(e) => handleRightClick(e)}
            style={{
                boxShadow: `${colorsByItemTier[itemData.tier]} 0px 3px 8px`,
            }}>
            <img src={itemData.url} className="h-7" alt={`${name} item`}></img>
            <span>{item.amount}</span>

            {show ? (
                <Tooltip itemData={itemData} setFloating={refs.setFloating} floatingStyles={floatingStyles} getFloatingProps={getFloatingProps} />
            ) : null}
        </div>
    );
}

export default InventorySlot;
