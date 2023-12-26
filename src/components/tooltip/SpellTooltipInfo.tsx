import {useSelector} from "react-redux";
import {SpellProps} from "../../data/spellsData";
import {RootState} from "../../gameState/store";
import {getSpellCooldown} from "../../utils/combatUtils";
type SpellToolTipInfoProps = {
    spell: SpellProps;
};

function SpellTooltipInfo({spell}: SpellToolTipInfoProps) {
    const {name, manaCost, description, cooldown} = spell;
    const {cooldownReduction} = useSelector((state: RootState) => state.playerStats);

    return (
        <>
            <span className="text-yellow-500">
                {name}
                <span className="text-blue-500 ml-2">Mana: {manaCost}</span>
                <span className="text-green-500 ml-2">Cooldown: {getSpellCooldown(cooldown, cooldownReduction)}s</span>
            </span>
            <span>{description}</span>
        </>
    );
}

export default SpellTooltipInfo;
