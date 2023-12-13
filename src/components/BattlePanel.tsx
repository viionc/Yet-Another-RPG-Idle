import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import Spinner from "./Spinner";

function BattlePanel() {
    const battleState = useSelector((state: RootState) => state.battleState);
    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="h-[2rem]">Plains - {battleState.enemy?.name} lv. 1</h1>
            <div className="w-full h-[16.9rem] relative">
                <img src="./assets/backgrounds/plains.png" className="rounded-lg w-full object-cover max-h-full object-bottom "></img>
                {battleState.enemy ? (
                    <div>
                        <div className="absolute z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[2rem] bg-black  rounded-lg flex justify-center items-center">
                            <span className="z-30">
                                {battleState.enemy.currentHp}/{battleState.enemy.maxHp}
                            </span>
                            <span
                                className="z-20 h-[2rem] rounded-lg absolute top-0 left-0 bg-red-500"
                                style={{width: (battleState.enemy.currentHp / battleState.enemy.maxHp) * 100 + "%"}}></span>
                        </div>

                        <img
                            src="./assets/enemies/slime.png"
                            className="absolute z-10 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[7rem]"></img>
                    </div>
                ) : (
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spinner variant="xl" />
                    </div>
                )}
            </div>
        </section>
    );
}

export default BattlePanel;
