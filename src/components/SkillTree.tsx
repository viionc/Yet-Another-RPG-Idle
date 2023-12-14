import {SkillTreeProps} from "../data/skillTreesData";
import Skill from "./Skill";

function SkillTree({skillTree}: {skillTree: SkillTreeProps}) {
    return (
        <article className="flex flex-col gap-2 items-center col-span-1">
            <h1 className="text-2xl">{skillTree.name}</h1>
            <div className="grid grid-rows-6 grid-cols-3 gap-2 h-[38rem] w-full px-8">
                {skillTree.skills.map((skill) => (
                    <Skill key={skill.id} skill={skill}></Skill>
                ))}
            </div>
        </article>
    );
}

export default SkillTree;
