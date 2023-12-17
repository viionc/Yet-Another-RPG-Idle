import {useDispatch} from "react-redux";
import {Tabs} from "../App";
import {resetAction} from "../gameState/store";
import {addItemsToInventory} from "../gameState/storeSlices/playerInventory";

function Header({setTabOpen}: {setTabOpen: React.Dispatch<React.SetStateAction<Tabs>>}) {
    const dispatch = useDispatch();
    return (
        <header className="container h-8 py-8 text-white flex gap-2 text-xl">
            <button className="text-red-500" onClick={() => dispatch(resetAction())}>
                Reset All
            </button>
            <button className="text-red-500" onClick={() => dispatch(addItemsToInventory([{id: 5, amount: 1}]))}>
                add knife
            </button>
            <span>-----</span>
            <nav>
                <ul className="flex gap-2">
                    <li onClick={() => setTabOpen("Main")} className="cursor-pointer hover:text-yellow-500">
                        Main
                    </li>
                    <li onClick={() => setTabOpen("Skill Tree")} className="cursor-pointer hover:text-yellow-500">
                        Skill Tree
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
