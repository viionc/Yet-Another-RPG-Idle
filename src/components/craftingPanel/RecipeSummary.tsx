import { useSelector } from 'react-redux'
import ITEM_DATA from '../../data/itemsData'
import { CraftingRecipeProps } from '../../data/recipesData'
import { GameState, thunkDispatch } from '../../store'
import { colorsByItemTier } from '../../consts/item'
import { craftItemThunk } from '../../store/player-inventory/player-inventory.thunks'

function RecipeSummary({ recipe }: { recipe: CraftingRecipeProps }) {
  const playerInventory = useSelector((state: GameState) => state.playerInventory)

  const handleLeftClick = () => {
    thunkDispatch(craftItemThunk(recipe))
  }

  const color = colorsByItemTier[ITEM_DATA[recipe.itemId].tier]

  return (
    <article className="w-1/2 h-full bg-zinc-800 bg-opacity-90 py-2 px-4">
      <h2
        className="text-2xl mb-4 "
        style={{ color }}
      >
        {recipe.name}
      </h2>
      <span>Items needed:</span>
      <ul>
        {recipe.itemsNeeded.map((itemNeeded) => {
          const item = ITEM_DATA[itemNeeded.id]
          const inventoryItem = playerInventory.find((i) => i?.id === itemNeeded.id)
          const color = inventoryItem && inventoryItem.amount >= itemNeeded.amount ? 'text-white' : 'text-red-500'

          return (
            <li
              key={item.name}
              className={`${color}`}
            >
              {itemNeeded.amount} {item.name}
            </li>
          )
        })}
      </ul>
      <div className="w-full mt-8 flex justify-center items-end">
        <button
          className="text-2xl ms-auto me-auto mt-auto  border rounded-md p-2 bg-zinc-800 hover:bg-yellow-500 hover:text-black cursor-pointer"
          onClick={handleLeftClick}
        >
          Craft
        </button>
      </div>
    </article>
  )
}

export default RecipeSummary
