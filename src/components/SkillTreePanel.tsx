import SKILL_TREES_DATA from "../data/skillTreesData";
import SkillTree from "./SkillTree";

function SkillTreePanel() {
    return (
        <section className="border rounded-md col-span-3 col-start-2 row-start-1 row-span-2 p-2 border-slate-800 bg-neutral-800 grid grid-cols-3">
            <SkillTree skillTree={SKILL_TREES_DATA[0]}></SkillTree>
            <SkillTree skillTree={SKILL_TREES_DATA[1]}></SkillTree>
            <SkillTree skillTree={SKILL_TREES_DATA[2]}></SkillTree>
        </section>
    );
}

export default SkillTreePanel;
