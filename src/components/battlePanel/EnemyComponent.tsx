import ENEMIES_DATA from "../../data/enemiesData";
import {BattleStateEnemyProps} from "../../gameState/storeSlices/battleState";

function EnemyComponent({enemy}: {enemy: BattleStateEnemyProps}) {
    const enemyUrl = ENEMIES_DATA[enemy.id].url;
    const enemyName = ENEMIES_DATA[enemy.id].name;

    return (
        <div>
            <div className="absolute z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[2rem] bg-black  rounded-lg flex justify-center items-center">
                <span className="z-30">
                    {enemy.currentHp}/{enemy.maxHp}
                </span>
                <span
                    className="z-20 h-[2rem] rounded-lg absolute top-0 left-0 bg-red-500"
                    style={{width: (enemy.currentHp / enemy.maxHp) * 100 + "%"}}></span>
            </div>

            <img
                src={enemyUrl}
                className="absolute z-10 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[7rem]"
                alt={`${enemyName} enemy `}></img>
        </div>
    );
}

export default EnemyComponent;
