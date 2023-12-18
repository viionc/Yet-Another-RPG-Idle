import {useDispatch} from "react-redux";
import {Tabs} from "../App";
import {resetAction} from "../gameState/store";
import {addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {changeWave} from "../gameState/storeSlices/battleState";

function Header({setTabOpen, skillPoints}: {setTabOpen: React.Dispatch<React.SetStateAction<Tabs>>; skillPoints: number}) {
    const dispatch = useDispatch();

    return (
        <header className="container h-8 py-8 text-white flex gap-2 text-2xl mb-6">
            <div className="absolute top-24 left-1 flex flex-col gap-2">
                <button className="text-red-500" onClick={() => dispatch(resetAction())}>
                    Reset All
                </button>
                <button className="text-red-500" onClick={() => dispatch(addItemsToInventory([{id: 5, amount: 1}]))}>
                    add knife
                </button>
                <button className="text-red-500" onClick={() => dispatch(addItemsToInventory([{id: 4, amount: 1}]))}>
                    add crown
                </button>
                <button className="text-red-500" onClick={() => dispatch(changeWave(10))}>
                    skip to boss
                </button>
            </div>

            <nav>
                <ul className="flex gap-4">
                    <li onClick={() => setTabOpen("Main")} className="cursor-pointer hover:text-yellow-500">
                        Main
                    </li>
                    <li onClick={() => setTabOpen("Skill Tree")} className="cursor-pointer hover:text-yellow-500">
                        Skill Tree {skillPoints > 0 ? <span className="text-yellow-500">({skillPoints})</span> : null}
                    </li>
                    <li onClick={() => setTabOpen("Crafting")} className="cursor-pointer hover:text-yellow-500">
                        Crafting
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
