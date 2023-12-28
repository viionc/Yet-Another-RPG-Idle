import {useState} from "react";
import {SkillProps} from "../../data/skillTreesData";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import {addSkillPoint} from "../../gameState/storeSlices/playerSkills";
import {decreaseStats} from "../../gameState/storeSlices/playerStats";
import useTooltip from "../../hooks/useTooltip";
import Tooltip from "../tooltip/Tooltip";

function SkillSlot({skill}: {skill: SkillProps}) {
    const [show, setShow] = useState(false);
    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});

    const playerSkills = useSelector((state: RootState) => state.playerSkills);
    const {unspentSkillPoints} = useSelector((state: RootState) => state.playerStats);
    const dispatch = useDispatch();
    const currentSkillPointLevel = playerSkills[skill.name] ?? 0;
    const isMaxLevel = currentSkillPointLevel === skill.maxLevel;

    const spendSkillPoint = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isMaxLevel || !unspentSkillPoints || unspentSkillPoints < skill.skillPointCost) return;
        const skillLevel = playerSkills[skill.name] ?? 0;
        const amount = event.ctrlKey ? Math.min(unspentSkillPoints, skill.maxLevel - skillLevel) : 1;
        dispatch(addSkillPoint({name: skill.name, amount}));
        dispatch(decreaseStats([{key: "unspentSkillPoints", amount}]));
    };

    return (
        <>
            <div
                className={`border flex justify-center items-center border-zinc-600 bg-zinc-800 flex-col bg-no-repeat bg-cover bg-center bg-origin-content cursor-pointer ${
                    skill.special ? "rounded-full" : "rounded-md"
                } ${isMaxLevel ? "bg-green-700" : "bg-zinc-700"}`}
                ref={refs.setReference}
                {...getReferenceProps()}
                onClick={(e) => spendSkillPoint(e)}
                style={{gridRowStart: skill.row, gridColumnStart: skill.col, backgroundImage: `url('${skill.url}')`}}>
                <div className="bg-black bg-opacity-[60%] p-1 rounded-md flex flex-col items-center select-none">
                    <div className={`${isMaxLevel ? "text-green-500" : "text-white"}`}>
                        {currentSkillPointLevel} / {skill.maxLevel}
                    </div>
                    {!isMaxLevel ? <div>{skill.skillPointCost} SP</div> : null}
                </div>
            </div>
            {show ? (
                <Tooltip
                    data={{type: "skill", skill}}
                    setFloating={refs.setFloating}
                    floatingStyles={floatingStyles}
                    getFloatingProps={getFloatingProps}
                />
            ) : null}
        </>
    );
}

export default SkillSlot;
