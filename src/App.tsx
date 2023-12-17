import {useEffect, useState} from "react";
import BattlePanel from "./components/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import {gameTickHandler} from "./tickHandler/gameInterval";
import {useDispatch, useSelector} from "react-redux";
import {battleTickHandler} from "./tickHandler/battleInterval";
import {RootState} from "./gameState/store";
import {clearInterval, setInterval} from "worker-timers";
import InventoryPanel from "./components/InventoryPanel";
import SkillTreePanel from "./components/SkillTreePanel";
import PlayerEquipmentPanel from "./components/PlayerEquipmentPanel";
import SpellsPanel from "./components/SpellsPanel";

export type Tabs = "Main" | "Skill Tree";

function App() {
    const dispatch = useDispatch();
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const playerSkills = useSelector((state: RootState) => state.playerSkills);

    const [tabOpen, setTabOpen] = useState<Tabs>("Main");
    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        const battleInterval = setInterval(() => battleTickHandler(dispatch), playerStats.attackSpeed * 1000);
        return () => {
            clearInterval(gameInterval);
            clearInterval(battleInterval);
        };
    }, [playerSkills]); //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Header setTabOpen={setTabOpen}></Header>
            <main className="container grid grid-cols-4 gap-2 text-white" style={{gridTemplateRows: "20rem 5rem 20rem"}}>
                <StatsPanel callback={() => setTabOpen("Skill Tree")}></StatsPanel>
                {tabOpen === "Main" ? (
                    <>
                        <BattlePanel></BattlePanel>
                        <SpellsPanel></SpellsPanel>
                        <InventoryPanel></InventoryPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
                {tabOpen === "Skill Tree" ? <SkillTreePanel></SkillTreePanel> : null}
            </main>
        </>
    );
}

export default App;
