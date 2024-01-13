import {useState} from "react";
import {QuickBarSpellProps, SpellPayloadProps, castSpell} from "../../gameState/storeSlices/playerSpells";
import {useDispatch, useSelector} from "react-redux";
import SPELLS_DATA, {SpellEffectProps, SpellNames} from "../../data/spellsData";
import {RootState} from "../../gameState/store";
import {doSpellDamage, getSpellCooldown, getSpellDuration} from "../../utils/combatUtils";
import styles from "./SpellSlot.module.css";
import Tooltip from "../tooltip/Tooltip";
import useTooltip from "../../hooks/useTooltip";

export type SpellSlotProps = {
    spell: QuickBarSpellProps | null;
    index: number;
};

function SpellSlot({spell, index}: SpellSlotProps) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});
    const {spellsQuickBar} = useSelector((state: RootState) => state.playerSpells);
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const {isBattleStarted, enemy} = useSelector((state: RootState) => state.battleState);

    const handleClick = (spellName: SpellNames, quickBarIndex: number) => {
        const {effect, name, baseManaCost: manaCost, baseCooldown: cooldown} = SPELLS_DATA[spellName];
        // check if player can cast spell
        if (!canCastSpell(manaCost, effect, quickBarIndex)) return;
        const spellCooldown = getSpellCooldown(cooldown, playerStats.cooldownReduction);
        const spellToCast = {name: spellName, cooldown: spellCooldown} as SpellPayloadProps;
        // add duration to payload if it's a buff spell
        if (effect.type === "Support Stat Buff") {
            spellToCast.duration = getSpellDuration(effect.duration, playerStats.increasedSpellDuration);
        }
        dispatch(castSpell(spellToCast));
        // if it's a damage type spell run damage calculations
        if (effect.type.includes("Damage")) doSpellDamage(dispatch, name, enemy);
    };

    const canCastSpell = (manaCost: number, spellEffect: SpellEffectProps, quickBarIndex: number): boolean => {
        const quickBarSpell = spellsQuickBar[quickBarIndex] as QuickBarSpellProps;
        if (manaCost > playerStats.mana || quickBarSpell.currentCooldown > 0 || (spellEffect.type.includes("Damage") && !isBattleStarted))
            return false;
        return true;
    };

    // if slot is empty render an empty cell
    if (!spell) return <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>;
    const spellData = SPELLS_DATA[spell.name];
    const {baseCooldown: cooldown, url, name} = spellData;

    // css magic stuff for a neat background overlay that goes in a "circle" when cooldown goes down
    const passedTime = (spell.currentCooldown / getSpellCooldown(cooldown, playerStats.cooldownReduction)) * 100;
    if (refs.reference.current) (refs.reference.current as HTMLElement).style.setProperty("--time-left", `${passedTime}%`);

    return (
        <div
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={() => handleClick(spell.name, index)}
            className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer">
            <div
                className={`relative w-16 h-16 
                ${styles.spell}
            `}>
                {spell.currentCooldown > 0 ? (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">{spell.currentCooldown}</span>
                ) : null}
                <img src={url} height="auto" width="auto" className="rounded-md" alt={`${name} spell`}></img>
            </div>

            {show ? (
                <Tooltip
                    data={{type: "spell", spell: spellData}}
                    setFloating={refs.setFloating}
                    floatingStyles={floatingStyles}
                    getFloatingProps={getFloatingProps}
                />
            ) : null}
        </div>
    );
}

export default SpellSlot;
