import {SkillTreeProps} from "../../data/skillTreesData";
import SkillSlot from "./SkillSlot";

function SkillTreeComponent({skillTree}: {skillTree: SkillTreeProps}) {
    return (
        <article className="flex flex-col gap-2 items-center col-span-1 bg-black bg-opacity-25 rounded-md">
            <h1 className="text-2xl mt-2">{skillTree.name}</h1>
            <div className="grid grid-rows-6 grid-cols-3 gap-2 h-[38rem] w-full px-8">
                {skillTree.skills.map((skill) => (
                    <SkillSlot key={skill.id} skill={skill} />
                ))}
            </div>
        </article>
    );
}

export default SkillTreeComponent;
