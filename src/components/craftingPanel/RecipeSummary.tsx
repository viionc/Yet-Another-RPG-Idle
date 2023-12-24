import {useDispatch, useSelector} from "react-redux";
import ITEM_DATA, {colorsByItemTier} from "../../data/itemsData";
import {CraftingRecipeProps} from "../../data/recipesData";
import {RootState} from "../../gameState/store";
import {addItemsToInventory, removeItemsFromInventory} from "../../gameState/storeSlices/playerInventory";

function RecipeSummary({recipe}: {recipe: CraftingRecipeProps}) {
    const playerInventory = useSelector((state: RootState) => state.playerInventory);
    const dispatch = useDispatch();

    const handleLeftClick = () => {
        const itemsToRemove = [];
        for (let i = 0; i < recipe.itemsNeeded.length; i++) {
            const itemNeeded = recipe.itemsNeeded[i];
            const inventoryItem = playerInventory.find((item) => item?.id === itemNeeded.id);
            if (!inventoryItem || inventoryItem.amount < itemNeeded.amount) return;
            itemsToRemove.push({id: itemNeeded.id, amount: itemNeeded.amount});
        }
        dispatch(removeItemsFromInventory(itemsToRemove));
        dispatch(addItemsToInventory([{id: recipe.itemId, amount: recipe.createsAmount}]));
    };

    const color = colorsByItemTier[ITEM_DATA[recipe.itemId].tier];

    return (
        <article className="w-2/5 h-full bg-zinc-800 bg-opacity-80 py-2 px-4">
            <h2 className="text-2xl mb-4 " style={{color}}>
                {recipe.name}
            </h2>
            <span>Items needed:</span>
            <ul>
                {recipe.itemsNeeded.map((itemNeeded) => {
                    const item = ITEM_DATA[itemNeeded.id];
                    const inventoryItem = playerInventory.find((_item) => _item && _item.id === item.id);
                    const color = inventoryItem && inventoryItem.amount >= itemNeeded.amount ? "text-white" : "text-red-500";
                    return (
                        <li key={item.id} className={`${color}`}>
                            {itemNeeded.amount} {item.name}
                        </li>
                    );
                })}
            </ul>
            <div className="w-full h-52 flex justify-center items-end">
                <button
                    className="text-2xl border rounded-md p-2 bg-zinc-800 hover:bg-yellow-500 hover:text-black cursor-pointer"
                    onClick={handleLeftClick}>
                    Craft
                </button>
            </div>
        </article>
    );
}

export default RecipeSummary;
