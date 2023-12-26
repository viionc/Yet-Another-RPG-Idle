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
        </>
    );
}

export default SkillTooltipInfo;
