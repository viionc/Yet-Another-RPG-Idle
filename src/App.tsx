import {useEffect, useState} from "react";
import BattlePanel from "./components/battlePanel/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import {gameTickHandler} from "./tickHandler/gameInterval";
import {useDispatch, useSelector} from "react-redux";
import {battleTickHandler} from "./tickHandler/battleInterval";
import {RootState} from "./gameState/store";
import {clearInterval, setInterval} from "worker-timers";
import InventoryPanel from "./components/inventoryPanel/InventoryPanel";
import SkillTreePanel from "./components/skillTreePanel/SkillTreePanel";
import PlayerEquipmentPanel from "./components/equipmentPanel/PlayerEquipmentPanel";
import SpellsPanel from "./components/spellsPanel/SpellsPanel";
import CraftingPanel from "./components/craftingPanel/CraftingPanel";
// import {Dispatch, UnknownAction} from "@reduxjs/toolkit";

export type Tabs = "Main" | "Skill Tree" | "Crafting";

function App() {
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const [tabOpen, setTabOpen] = useState<Tabs>("Main");
    const [delay, setDelay] = useState(playerStats.attackSpeed * 1000);
    const dispatch = useDispatch();

    // trying out useinterval hook from this thread: https://stackoverflow.com/questions/61971791/react-setinterval-in-useeffect-with-settimeout-delay
    // const [start] = useInterval(() => battleTickHandler(dispatch), playerStats.attackSpeed * 1000); // first try
    // (start as () => void)();

    //didnt work

    useEffect(() => {
        const battleInterval = setInterval(() => {
            setDelay(battleTickHandler(dispatch));
        }, delay);
        return () => {
            clearInterval(battleInterval);
        };
    }, [delay]); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        return () => {
            clearInterval(gameInterval);
        };
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Header setTabOpen={setTabOpen} skillPoints={playerStats.unspentSkillPoints}></Header>
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
                {tabOpen === "Crafting" ? <CraftingPanel></CraftingPanel> : null}
            </main>
        </>
    );
}

export default App;
