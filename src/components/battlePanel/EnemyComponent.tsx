import ENEMIES_DATA from "../../data/enemiesData";
import {BattleStateEnemyProps} from "../../gameState/storeSlices/battleState";
import Spinner from "../Spinner";

type EnemyComponentProps = {
    weaknessesUnlocked: number | undefined;
    enemy: BattleStateEnemyProps | null;
};

function EnemyComponent({enemy, weaknessesUnlocked}: EnemyComponentProps) {
    if (!enemy) {
        return (
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spinner variant="xl" />
            </div>
        );
    }

    const {url, weakness, name} = ENEMIES_DATA[enemy.id];

    return (
        <div>
            <div className="absolute z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-black border-2 border-yellow-500 flex justify-center items-center">
                <span className="z-30">
                    {enemy.currentHp}/{enemy.maxHp}
                </span>
                <span className="z-20 h-full absolute top-0 left-0 bg-red-500" style={{width: (enemy.currentHp / enemy.maxHp) * 100 + "%"}}></span>
            </div>
            {weaknessesUnlocked && (
                <img
                    src={`./icons/${weakness.toLowerCase()}Weakness.png`}
                    className="absolute z-10 top-1/3 left-[61%] -translate-x-1/2 -translate-y-1/2 h-6 w-6 "
                    alt={`${weakness} weakness`}
                />
            )}

            <img src={url} className="absolute z-10 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[8rem]" alt={`${name} enemy `} />
        </div>
    );
}

export default EnemyComponent;
