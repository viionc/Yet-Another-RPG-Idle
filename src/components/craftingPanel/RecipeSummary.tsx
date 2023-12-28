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
            const inventoryItem = playerInventory.find((item) => item?.name === itemNeeded.name);
            if (!inventoryItem || inventoryItem.amount < itemNeeded.amount) return;
            itemsToRemove.push({name: itemNeeded.name, amount: itemNeeded.amount});
        }
        dispatch(removeItemsFromInventory(itemsToRemove));
        dispatch(addItemsToInventory([{name: recipe.name, amount: recipe.createsAmount}]));
    };

    const color = colorsByItemTier[ITEM_DATA[recipe.name].tier];

    return (
        <article className="w-1/2 h-full bg-zinc-800 bg-opacity-90 py-2 px-4">
            <h2 className="text-2xl mb-4 " style={{color}}>
                {recipe.name}
            </h2>
            <span>Items needed:</span>
            <ul>
                {recipe.itemsNeeded.map((itemNeeded) => {
                    const item = ITEM_DATA[itemNeeded.name];
                    const inventoryItem = playerInventory.find((_item) => _item && _item.name === item.name);
                    const color = inventoryItem && inventoryItem.amount >= itemNeeded.amount ? "text-white" : "text-red-500";
                    return (
                        <li key={item.name} className={`${color}`}>
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
