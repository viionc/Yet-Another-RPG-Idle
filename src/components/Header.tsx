import {useDispatch} from "react-redux";
import {resetAction} from "../gameState/store";
import {Tabs} from "../App";

function Header({setTabOpen}: {setTabOpen: React.Dispatch<React.SetStateAction<Tabs>>}) {
    const dispatch = useDispatch();
    return (
        <header className="container h-8 py-8 text-white flex gap-2">
            <button className="text-red-500" onClick={() => dispatch(resetAction())}>
                Reset All
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
