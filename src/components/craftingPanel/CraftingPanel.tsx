import { useState } from 'react'
import ITEM_DATA from '../../data/itemsData'
import RECIPES_DATA, { CraftingRecipeProps } from '../../data/recipesData'
import RecipeSlot from './RecipeSlot'
import RecipeSummary from './RecipeSummary'

function CraftingPanel() {
  const [selectedRecipe, setSelectedrecipe] = useState<null | CraftingRecipeProps>(null)
  const recipeArray = Object.entries(RECIPES_DATA)

  return (
    <section
      className="col-span-2 col-start-2 row-start-1 row-span-2 bg-neutral-800 flex gap-2 bg-no-repeat shadow-md rounded-md"
      style={{ backgroundImage: 'url(./backgrounds/craftingPanel.png)' }}
    >
      <article className="w-3/5 flex flex-col h-full p-2">
        <h2 className="mb-2">Recipes:</h2>
        <div className="flex gap-2 flex-wrap">
          {recipeArray.map(([key, recipe]) => {
            const item = ITEM_DATA[recipe.itemId]

            return (
              <RecipeSlot
                key={key}
                item={item}
                setRecipe={() => setSelectedrecipe(recipe)}
              />
            )
          })}
        </div>
      </article>
      {selectedRecipe && <RecipeSummary recipe={selectedRecipe}></RecipeSummary>}
    </section>
  )
}

export default CraftingPanel
