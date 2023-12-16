import {useState} from "react";
import {SkillProps} from "../data/skillTreesData";
import {usePopper} from "react-popper";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import {addSkillPoint} from "../gameState/storeSlices/playerSkills";
import {decreaseStats} from "../gameState/storeSlices/playerStats";

function Skill({skill}: {skill: SkillProps}) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);

    const playerSkills = useSelector((state: RootState) => state.playerSkills);
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const dispatch = useDispatch();
    const currentSkillPointLevel = playerSkills[skill.name] ?? 0;
    const isMaxLevel = currentSkillPointLevel === skill.maxLevel;

    const useSkillPoint = () => {
        if (isMaxLevel || !playerStats.unspentSkillPoints) return;
        dispatch(addSkillPoint(skill.name));
        dispatch(decreaseStats([{id: "unspentSkillPoints", amount: 1}]));
    };

    return (
        <>
            <div
                className={`border flex justify-center items-center border-zinc-600 bg-zinc-800 flex-col bg-no-repeat bg-cover bg-center p-2 bg-origin-content ${
                    skill.special ? "rounded-full" : "rounded-md"
                } ${isMaxLevel ? "bg-green-700" : "bg-zinc-700"}`}
                ref={setReferenceElement}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={useSkillPoint}
                style={{gridRowStart: skill.row, gridColumnStart: skill.col, backgroundImage: `url('${skill.url}')`}}>
                <div className="bg-black bg-opacity-[40%] p-1 rounded-md flex flex-col items-center">
                    <div className={`${isMaxLevel ? "text-green-500" : "text-white"}`}>
                        {currentSkillPointLevel} / {skill.maxLevel}
                    </div>
                    {!isMaxLevel ? <div>{skill.skillPointCost} SP</div> : null}
                </div>
            </div>
            {show ? (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="p-1 bg-zinc-700 rounded-md border border-slate-800 flex flex-col gap-1 max-w-[350px]">
                    <div className="text-yellow-500">{skill.name}</div>
                    <div>{skill.description}</div>
                </div>
            ) : null}
        </>
    );
}

export default Skill;
