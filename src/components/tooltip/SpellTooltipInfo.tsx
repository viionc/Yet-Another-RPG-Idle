import {useSelector} from "react-redux";
import {SpellProps} from "../../data/spellsData";
import {RootState} from "../../gameState/store";
import {getSpellCooldown} from "../../utils/combatUtils";
type SpellToolTipInfoProps = {
    spell: SpellProps;
};

function SpellTooltipInfo({spell}: SpellToolTipInfoProps) {
    const {name, manaCost, description, cooldown, effect} = spell;
    const {cooldownReduction} = useSelector((state: RootState) => state.playerStats);

    return (
        <>
            <div className="flex justify-between">
                <span className="text-yellow-500">{name}</span>
                <span className="text-purple-500">{effect.type}</span>
            </div>
            <div className="flex gap-2">
                <span className="text-blue-500">Mana: {manaCost}</span>
                <span className="text-green-500">Cooldown: {getSpellCooldown(cooldown, cooldownReduction)}s</span>
            </div>
            <span>{description}</span>
        </>
    );
}

export default SpellTooltipInfo;
