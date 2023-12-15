import {useEffect, useState} from "react";
import BattlePanel from "./components/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import {gameTickHandler} from "./tickHandler/gameInterval";
import {useDispatch, useSelector} from "react-redux";
import {battleTickHandler, calculateAttackSpeed} from "./tickHandler/battleInterval";
import {RootState} from "./gameState/store";
import {clearInterval, setInterval} from "worker-timers";
import InventoryPanel from "./components/InventoryPanel";
import SkillTreePanel from "./components/SkillTreePanel";

export type Tabs = "Main" | "Skill Tree";

function App() {
    const dispatch = useDispatch();
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const playerSkills = useSelector((state: RootState) => state.playerSkills);

    const [tabOpen, setTabOpen] = useState<Tabs>("Skill Tree");
    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        const battleInterval = setInterval(() => battleTickHandler(dispatch), calculateAttackSpeed(playerStats.attackSpeed, playerSkills) * 1000);
        return () => {
            clearInterval(gameInterval);
            clearInterval(battleInterval);
        };
    }, [playerSkills]); //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Header setTabOpen={setTabOpen}></Header>
            <main className="container grid grid-cols-4 grid-rows-2 gap-2 text-white">
                <StatsPanel callback={() => setTabOpen("Skill Tree")}></StatsPanel>
                {tabOpen === "Main" ? (
                    <>
                        <BattlePanel></BattlePanel>
                        <InventoryPanel></InventoryPanel>
                    </>
                ) : null}
                {tabOpen === "Skill Tree" ? <SkillTreePanel></SkillTreePanel> : null}
            </main>
        </>
    );
}

export default App;
