import {useDispatch, useSelector} from "react-redux";
import {Tabs} from "../App";
import {RootState, resetAction} from "../gameState/store";
import {addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {changeWave} from "../gameState/storeSlices/battleState";
import {increaseStats} from "../gameState/storeSlices/playerStats";

function Header({setTabOpen}: {setTabOpen: React.Dispatch<React.SetStateAction<Tabs>>}) {
    const dispatch = useDispatch();
    const {unspentSkillPoints} = useSelector((state: RootState) => state.playerStats);
    const unlocks = useSelector((state: RootState) => state.unlocks);

    return (
        <header className="container h-8 py-8 text-white flex gap-2 text-2xl mb-6">
            <div className="absolute top-24 left-1 flex flex-col gap-2 max-w-[100px] text-xs">
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(resetAction())}>
                    Reset All
                </button>
                <button className="text-red-500 border hover:text-white " onClick={() => dispatch(addItemsToInventory([{id: 5, amount: 1}]))}>
                    add knife
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(addItemsToInventory([{id: 4, amount: 1}]))}>
                    add crown
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(changeWave(10))}>
                    skip to boss
                </button>
                <button
                    className="text-red-500 border hover:text-white"
                    onClick={() => dispatch(increaseStats([{id: "unspentSkillPoints", amount: 10}]))}>
                    add 10 skill points
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(increaseStats([{id: "goldCoins", amount: 10000}]))}>
                    add 10k coins
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(addItemsToInventory([{id: 1, amount: 100}]))}>
                    add 100 crab meat
                </button>
            </div>

            <nav>
                <ul className="flex gap-4">
                    <li onClick={() => setTabOpen("Main")} className="cursor-pointer hover:text-yellow-500">
                        Main
                    </li>
                    <li onClick={() => setTabOpen("Skill Tree")} className="cursor-pointer hover:text-yellow-500">
                        Skill Tree {unspentSkillPoints > 0 ? <span className="text-yellow-500">({unspentSkillPoints})</span> : null}
                    </li>
                    {unlocks.crafting ? (
                        <li onClick={() => setTabOpen("Crafting")} className="cursor-pointer hover:text-yellow-500">
                            Crafting
                        </li>
                    ) : null}
                    {unlocks.towns ? (
                        <li onClick={() => setTabOpen("Towns")} className="cursor-pointer hover:text-yellow-500">
                            Towns
                        </li>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
