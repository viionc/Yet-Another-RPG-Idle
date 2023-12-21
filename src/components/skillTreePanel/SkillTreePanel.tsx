import SKILL_TREES_DATA from "../../data/skillTreesData";
import SkillTreeComponent from "./SkillTreeComponent";

function SkillTreePanel() {
    return (
        <section className="border rounded-md col-span-3 col-start-2 row-start-1 row-span-3 p-2 gap-2 border-slate-800 bg-neutral-800 grid grid-cols-3">
            {SKILL_TREES_DATA.map((skillTree) => (
                <SkillTreeComponent key={skillTree.id} skillTree={skillTree}></SkillTreeComponent>
            ))}
        </section>
    );
}

export default SkillTreePanel;
