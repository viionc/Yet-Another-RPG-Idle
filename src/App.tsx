import {useEffect, useState} from "react";
import BattlePanel from "./components/battlePanel/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import InventoryPanel from "./components/inventoryPanel/InventoryPanel";
import SkillTreePanel from "./components/skillTreePanel/SkillTreePanel";
import PlayerEquipmentPanel from "./components/equipmentPanel/PlayerEquipmentPanel";
import SpellsPanel from "./components/spellsPanel/SpellsPanel";
import CraftingPanel from "./components/craftingPanel/CraftingPanel";
import TownPanel from "./components/townPanel/TownPanel";
import {battleTickHandler} from "./tickHandler/battleInterval";
import {gameTickHandler} from "./tickHandler/gameInterval";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./gameState/store";
import {clearInterval, setInterval} from "worker-timers";

export type Tabs = "Main" | "Skill Tree" | "Crafting" | "Town";

function App() {
    const [tabOpen, setTabOpen] = useState<Tabs>("Main");
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const [delay, setDelay] = useState(playerStats.attackSpeed * 1000);
    const dispatch = useDispatch();

    useEffect(() => {
        const battleInterval = setInterval(() => {
            setDelay(battleTickHandler(dispatch));
        }, delay);
        return () => {
            clearInterval(battleInterval);
        };
    }, [delay, dispatch]);

    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        return () => {
            clearInterval(gameInterval);
        };
    }, [dispatch]);
    return (
        <>
            <Header setTabOpen={setTabOpen}></Header>
            <main className="container grid grid-cols-4 gap-2 text-white" style={{gridTemplateRows: "20rem 5rem 20rem"}}>
                <StatsPanel></StatsPanel>
                {tabOpen === "Main" ? (
                    <>
                        <BattlePanel></BattlePanel>
                        <SpellsPanel></SpellsPanel>
                        <InventoryPanel></InventoryPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
                {tabOpen === "Skill Tree" ? <SkillTreePanel></SkillTreePanel> : null}
                {tabOpen === "Crafting" ? (
                    <>
                        {" "}
                        <CraftingPanel></CraftingPanel>
                        <InventoryPanel></InventoryPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
                {tabOpen === "Town" ? (
                    <>
                        <TownPanel></TownPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
            </main>
        </>
    );
}

export default App;
