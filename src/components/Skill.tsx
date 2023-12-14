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
    const currentSkillPointLevel = playerSkills[skill.id] ?? 0;

    const useSkillPoint = () => {
        if (currentSkillPointLevel === skill.maxLevel || !playerStats.unspentSkillPoints) return;
        dispatch(addSkillPoint(skill.id));
        dispatch(decreaseStats([{id: "unspentSkillPoints", amount: 1}]));
    };

    return (
        <>
            <div
                className={`border flex justify-center items-center border-zinc-600 bg-zinc-800 flex-col ${
                    skill.special ? "rounded-full" : "rounded-md"
                }`}
                ref={setReferenceElement}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={useSkillPoint}
                style={{gridRowStart: skill.row, gridColumnStart: skill.col}}>
                <div>
                    {currentSkillPointLevel} / {skill.maxLevel}
                </div>
                {currentSkillPointLevel < skill.maxLevel ? <div>{skill.skillPointCost} SP</div> : null}
            </div>
            {show ? (
                <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                    {skill.name}
                </div>
            ) : null}
        </>
    );
}

export default Skill;
