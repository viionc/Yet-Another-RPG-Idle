import {useDispatch, useSelector} from "react-redux";
import ITEM_DATA from "../../data/itemsData";
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

    return (
        <>
            <h2 className="text-2xl mb-4">{recipe.name}</h2>
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
            <div className="w-full flex justify-center mt-auto">
                <button className="text-2xl border rounded-md p-2 hover:bg-yellow-500 hover:text-black cursor-pointer" onClick={handleLeftClick}>
                    Craft
                </button>
            </div>
        </>
    );
}

export default RecipeSummary;
