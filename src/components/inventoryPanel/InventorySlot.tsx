import {useState} from "react";
import ITEM_DATA, {EquipmentProps, colorsByItemTier} from "../../data/itemsData";
import {InventoryItem, addItemsToInventory} from "../../gameState/storeSlices/playerInventory";
import {usePopper} from "react-popper";
import {useDispatch, useSelector} from "react-redux";
import {equipItem, unequipItem} from "../../gameState/storeSlices/playerEquipment";
import {RootState} from "../../gameState/store";

export type InventorySlotProps = {
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setTargetIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    isDragging: boolean;
    inventoryIndex: number;
    item: InventoryItem | null;
};

function InventorySlot({item, inventoryIndex, setSelectedIndex, setTargetIndex, setIsDragging, isDragging}: InventorySlotProps) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const playerEquipment = useSelector((state: RootState) => state.playerEquipment);

    const handleOnMouseEnter = () => {
        if (isDragging) {
            setShow(false);
            setIsDragging(false);
            setTargetIndex(inventoryIndex);
        } else {
            setShow(true);
        }
    };

    const onDragStart = () => {
        setIsDragging(true);
        setShow(false);
        setSelectedIndex(inventoryIndex);
    };

    if (!item) {
        return (
            <div
                className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"
                onMouseEnter={handleOnMouseEnter}></div>
        );
    }

    const {tier, url, name, equipment} = ITEM_DATA[item.id];

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (equipment) handleEquipItem(equipment);
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
            ref={setReferenceElement}
            draggable
            onDragStart={onDragStart}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={() => setShow(false)}
            onContextMenu={(e) => handleRightClick(e)}
            style={{
                boxShadow: `${colorsByItemTier[tier]} 0px 3px 8px`,
            }}>
            <img src={`./items/${url}`} className="h-7" alt={`${name} item`}></img>
            <span>{item.amount}</span>

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
                                Equip
                                <img src="./other/rightClick.png" alt={`right click to equip`} height={16} width={16}></img>
                            </span>
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default InventorySlot;
