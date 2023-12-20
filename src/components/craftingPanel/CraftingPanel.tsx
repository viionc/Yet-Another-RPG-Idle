import {useState} from "react";
import ITEM_DATA from "../../data/itemsData";
import RECIPES_DATA, {CraftingRecipeProps} from "../../data/recipesData";
import RecipeSlot from "./RecipeSlot";
import RecipeSummary from "./RecipeSummary";

function CraftingPanel() {
    const [selectedRecipe, setSelectedrecipe] = useState<null | CraftingRecipeProps>(null);
    const recipeArray = Object.entries(RECIPES_DATA);

    return (
        <section className="border rounded-md col-span-3 col-start-2 row-start-1 row-span-3 p-2 border-slate-800 bg-neutral-800 flex gap-2">
            <article className="w-3/4 flex gap-2 flex-wrap">
                {recipeArray.map(([key, recipe]) => {
                    const item = ITEM_DATA[recipe.itemId];
                    return <RecipeSlot key={key} item={item} setRecipe={() => setSelectedrecipe(recipe)}></RecipeSlot>;
                })}
            </article>
            <article className="w-1/2 h-full">{selectedRecipe ? <RecipeSummary recipe={selectedRecipe}></RecipeSummary> : null}</article>
        </section>
    );
}

export default CraftingPanel;
