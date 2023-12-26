import {SkillProps} from "../../data/skillTreesData";

type SkillToolTipInfoProps = {
    skill: SkillProps;
};

function SkillTooltipInfo({skill}: SkillToolTipInfoProps) {
    const {name, description} = skill;
    return (
        <>
            <div className="text-yellow-500">{name}</div>
            <div>{description}</div>
            <div className="flex gap-2 mt-4 ms-auto">
                <span className="flex gap-1  items-center text-xs">
                    Add 1<img src="./other/leftClick.png" alt={`left click to add 1`} height={16} width={16}></img>
                </span>
                <span className="flex gap-1 ms-4 items-center text-xs">
                    Add Max <span className="text-yellow-500">Ctrl +</span>
                    <img src="./other/leftClick.png" alt={`left click to add 1`} height={16} width={16}></img>
                </span>
            </div>
        </>
    );
}

export default SkillTooltipInfo;
