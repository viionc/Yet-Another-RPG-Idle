import {useDispatch, useSelector} from "react-redux";
import ZONES_DATA from "../../data/zonesData";
import {RootState, resetAction} from "../../gameState/store";
import {changeWave} from "../../gameState/storeSlices/battleState";
import {addItemsToInventory} from "../../gameState/storeSlices/playerInventory";
import {increaseStats} from "../../gameState/storeSlices/playerStats";

function CheatMenu() {
    const dispatch = useDispatch();
    const {zoneId} = useSelector((state: RootState) => state.battleState);

    return (
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
    );
}

export default CheatMenu;
