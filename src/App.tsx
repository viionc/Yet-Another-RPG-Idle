import {useEffect} from "react";
import BattlePanel from "./components/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import {gameTickHandler} from "./tickHandler/gameInterval";
import {useDispatch, useSelector} from "react-redux";
import {battleTickHandler} from "./tickHandler/battleInterval";
import {RootState} from "./gameState/store";
import {clearInterval, setInterval} from "worker-timers";

function App() {
    const dispatch = useDispatch();
    const playerStats = useSelector((state: RootState) => state.playerStats);

    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        const battleInterval = setInterval(() => battleTickHandler(dispatch), playerStats.attackSpeed * 1000);
        return () => {
            clearInterval(gameInterval);
            clearInterval(battleInterval);
        };
    }, []);
    return (
        <>
            <Header></Header>
            <main className="container grid grid-cols-4 gap-2 text-white">
                <StatsPanel></StatsPanel>
                <BattlePanel></BattlePanel>
            </main>
        </>
    );
}

export default App;
