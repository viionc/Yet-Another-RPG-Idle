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

function App() {
    const dispatch = useDispatch();
    const playerStats = useSelector((state: RootState) => state.playerStats);

    const [skillTreeOpen, setSkillTreeOpen] = useState(false);

    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        const battleInterval = setInterval(() => battleTickHandler(dispatch), playerStats.attackSpeed * 1000);
        return () => {
            clearInterval(gameInterval);
            clearInterval(battleInterval);
        };
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Header></Header>
            <main className="container grid grid-cols-4 grid-rows-2 gap-2 text-white">
                <StatsPanel callback={() => setSkillTreeOpen(() => !skillTreeOpen)}></StatsPanel>
                {!skillTreeOpen ? (
                    <>
                        <BattlePanel></BattlePanel>
                        <InventoryPanel></InventoryPanel>
                    </>
                ) : null}
                {skillTreeOpen ? <SkillTreePanel></SkillTreePanel> : null}
            </main>
        </>
    );
}

export default App;
