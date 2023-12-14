import {SkillProps} from "../data/skillTreesData";

function Skill({skill}: {skill: SkillProps}) {
    return (
        <div
            className={`border flex justify-center items-center border-zinc-600 bg-zinc-800 flex-col ${
                skill.special ? "rounded-full" : "rounded-md"
            }`}
            style={{gridRowStart: skill.row, gridColumnStart: skill.col}}>
            Skill {skill.id}
        </div>
    );
}

export default Skill;
