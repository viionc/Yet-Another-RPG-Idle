import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import {Tabs} from "../../App";
import {changeSetting} from "../../gameState/storeSlices/playerSettings";
import CheatMenu from "./CheatMenu";

function Header() {
    const dispatch = useDispatch();
    const {unspentSkillPoints, level} = useSelector((state: RootState) => state.playerStats);
    const playerUnlockedContent = useSelector((state: RootState) => state.playerUnlockedContent);

    const changeTab = (tab: Tabs) => {
        dispatch(changeSetting({key: "navTab", value: tab}));
    };

    return (
        <header className="container h-20 text-white flex gap-2 text-2xl">
            {import.meta.env.VITE_DEV_MODE === "development" ? <CheatMenu /> : null}
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
