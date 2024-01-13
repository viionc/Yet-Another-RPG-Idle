import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../gameState/store";
import {battleTickHandler} from "../tickHandler/battleInterval";
import {gameTickHandler} from "../tickHandler/gameInterval";
import {clearInterval, setInterval} from "worker-timers";

function GameLoopComponent() {
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const {isBattleStarted} = useSelector((state: RootState) => state.battleState);
    const [delay, setDelay] = useState(playerStats.attackSpeed * 1000);
    const dispatch = useDispatch();

    // this is omega scuffed, i dont think intervals are the best way to solve them
    // every time interval runs once, it returns current delay that depends on attack speed
    // that was the only way i found to always have it correctly update
    // without delaying next interval

    // also using worker-timers to bypass browser "freezing" the game when browser tab is changed
    useEffect(() => {
        if (!isBattleStarted) return;

        const battleInterval = setInterval(() => {
            setDelay(battleTickHandler(dispatch));
        }, delay);
        return () => {
            clearInterval(battleInterval);
        };
    }, [delay, dispatch, isBattleStarted]);

    useEffect(() => {
        const gameInterval = setInterval(() => gameTickHandler(dispatch), 1000);
        return () => {
            clearInterval(gameInterval);
        };
    }, [dispatch]);
    return <></>;
}

export default GameLoopComponent;
