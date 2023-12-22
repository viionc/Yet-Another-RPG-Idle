import {useDispatch} from "react-redux";
import CloseButton from "../CloseButton";
import {TownTabs} from "./TownPanel";
import {startDialogue} from "../../gameState/storeSlices/dialogues";

function Tavern({setTownTab}: {setTownTab: React.Dispatch<React.SetStateAction<TownTabs>>}) {
    const dispatch = useDispatch();
    return (
        <div className="bg-[url('./backgrounds/tavern.png')] bg-no-repeat bg-center bg-cover w-full h-[91%] rounded-md relative">
            <CloseButton position="top-left" callback={() => setTownTab("Main")} />
            <div
                onClick={() => dispatch(startDialogue(0))}
                className="absolute top-1/2 -translate-y-1/2 right-5 bg-zinc-800 rounded-md border-slate-700 w-32 h-32 bg-opacity-80 flex justify-center items-center cursor-pointer">
                <img src="./avatars/laHarparBartender.png" height="108" width="108"></img>
            </div>
            <div
                onClick={() => dispatch(startDialogue(1))}
                className="absolute top-1/2 -translate-y-3/4 left-5 bg-zinc-800 rounded-md border-slate-700 w-32 h-32 bg-opacity-80 flex justify-center items-center cursor-pointer">
                <img src="./avatars/laHarparJosh.png" height="108" width="108"></img>
            </div>
        </div>
    );
}

export default Tavern;
