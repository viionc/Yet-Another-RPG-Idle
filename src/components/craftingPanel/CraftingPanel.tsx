import {useState} from "react";
import ITEM_DATA from "../../data/itemsData";
import RECIPES_DATA, {CraftingRecipeProps} from "../../data/recipesData";
import RecipeSlot from "./RecipeSlot";
import RecipeSummary from "./RecipeSummary";

function CraftingPanel() {
    const [selectedRecipe, setSelectedrecipe] = useState<null | CraftingRecipeProps>(null);
    const recipeArray = Object.entries(RECIPES_DATA);

    return (
        <section className="border rounded-md col-span-2 col-start-2 row-start-1 row-span-2 p-2 border-slate-800 bg-neutral-800 flex gap-2">
            <article className="w-3/4 flex flex-col h-full">
                <h2 className="mb-2">Recipes:</h2>
                <div className="flex gap-2 flex-wrap">
                    {recipeArray.map(([key, recipe]) => {
                        const item = ITEM_DATA[recipe.itemId];
                        return <RecipeSlot key={key} item={item} setRecipe={() => setSelectedrecipe(recipe)}></RecipeSlot>;
                    })}
                </div>
            </article>
            <article className="w-1/2 h-full">{selectedRecipe ? <RecipeSummary recipe={selectedRecipe}></RecipeSummary> : null}</article>
        </section>
    );
}

export default CraftingPanel;
