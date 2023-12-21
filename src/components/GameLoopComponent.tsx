import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../gameState/store";
import {battleTickHandler} from "../tickHandler/battleInterval";
import {gameTickHandler} from "../tickHandler/gameInterval";
import {clearInterval, setInterval} from "worker-timers";

function GameLoopComponent() {
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
    return <></>;
}

export default GameLoopComponent;
