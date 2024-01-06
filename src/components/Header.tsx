import {useDispatch, useSelector} from "react-redux";
import {RootState, resetAction} from "../gameState/store";
import {addItemsToInventory} from "../gameState/storeSlices/playerInventory";
import {changeWave} from "../gameState/storeSlices/battleState";
import {increaseStats} from "../gameState/storeSlices/playerStats";
import {Tabs} from "../App";
import {changeSetting} from "../gameState/storeSlices/playerSettings";
import ZONES_DATA from "../data/zonesData";

function Header() {
    const dispatch = useDispatch();
    const {unspentSkillPoints, level} = useSelector((state: RootState) => state.playerStats);
    const playerUnlockedContent = useSelector((state: RootState) => state.playerUnlockedContent);
    const {zoneId} = useSelector((state: RootState) => state.battleState);

    const changeTab = (tab: Tabs) => {
        dispatch(changeSetting({key: "navTab", value: tab}));
    };

    return (
        <header className="container h-20 text-white flex gap-2 text-2xl">
            <div className="absolute top-24 left-1 flex flex-col gap-2 max-w-[100px] text-xs">
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(resetAction())}>
                    Reset All
                </button>
                <button
                    className="text-red-500 border hover:text-white "
                    onClick={() => dispatch(addItemsToInventory([{name: "Slime Golden Crown", amount: 1}]))}>
                    add knife
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(addItemsToInventory([{name: "Knife", amount: 1}]))}>
                    add crown
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(changeWave(ZONES_DATA[zoneId].maxWave))}>
                    skip to boss
                </button>
                <button
                    className="text-red-500 border hover:text-white"
                    onClick={() => dispatch(increaseStats([{key: "unspentSkillPoints", amount: 10}]))}>
                    add 10 skill points
                </button>
                <button className="text-red-500 border hover:text-white" onClick={() => dispatch(increaseStats([{key: "goldCoins", amount: 10000}]))}>
                    add 10k coins
                </button>
                <button
                    className="text-red-500 border hover:text-white"
                    onClick={() => dispatch(addItemsToInventory([{name: "Crab Meat", amount: 100}]))}>
                    add 100 crab meat
                </button>
                <button
                    className="text-red-500 border hover:text-white"
                    onClick={() =>
                        dispatch(
                            increaseStats([
                                {key: "extraAirDamage", amount: 1},
                                {key: "extraDarkDamage", amount: 1},
                                {key: "extraEarthDamage", amount: 1},
                                {key: "extraFireDamage", amount: 1},
                                {key: "extraLightDamage", amount: 1},
                                {key: "extraPhysicalDamage", amount: 1},
                                {key: "extraWaterDamage", amount: 1},
                            ])
                        )
                    }>
                    increase elemental stats
                </button>
            </div>

            <nav className="h-full w-full">
                <ul className="flex h-full gap-4 w-full">
                    <li
                        onClick={() => changeTab("Main")}
                        className="cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-500 hover:text-black">
                        Battle
                    </li>
                    {level > 1 ? (
                        <li
                            onClick={() => changeTab("Skill Trees")}
                            className="group cursor-pointer w-full h-full flex items-center justify-center gap-1 hover:bg-yellow-500 hover:text-black">
                            Skill Trees
                            {unspentSkillPoints > 0 ? <span className="text-yellow-500 group-hover:text-black">({unspentSkillPoints})</span> : null}
                        </li>
                    ) : null}
                    {playerUnlockedContent.unlocked.crafting ? (
                        <li
                            onClick={() => changeTab("Crafting")}
                            className="cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-500 hover:text-black">
                            Crafting
                        </li>
                    ) : null}
                    {playerUnlockedContent.unlocked.towns ? (
                        <li
                            onClick={() => changeTab("Towns")}
                            className="cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-500 hover:text-black">
                            Towns
                        </li>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
