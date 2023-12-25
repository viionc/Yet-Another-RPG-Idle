import {useState} from "react";
import {QuickBarSpell} from "../../gameState/storeSlices/playerSpells";
import {useDispatch, useSelector} from "react-redux";
import SPELLS_DATA, {SpellNames} from "../../data/spellsData";
import {castSpell, updateEnemyHp} from "../../gameState/storeSlices/battleState";
import {RootState} from "../../gameState/store";
import {handleEndBattle} from "../../tickHandler/battleInterval";
import {spellHit} from "../../utils/combatUtils";
import styles from "./SpellSlot.module.css";
import Tooltip from "../tooltip/Tooltip";
import useTooltip from "../../hooks/useTooltip";

export type SpellSlotProps = {
    spell: QuickBarSpell | null;
    index: number;
};

function SpellSlot({spell, index}: SpellSlotProps) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});
    const playerSpells = useSelector((state: RootState) => state.playerSpells);
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const battleState = useSelector((state: RootState) => state.battleState);
    const unlocks = useSelector((state: RootState) => state.unlocks);

    const handleClick = (spellName: SpellNames, quickBarIndex: number) => {
        const {effect, manaCost, name} = SPELLS_DATA[spellName];
        const quickBarSpell = playerSpells.spellsQuickBar[quickBarIndex] as QuickBarSpell;
        if (manaCost > playerStats.mana || quickBarSpell.currentCooldown > 0) return;
        if (effect.type.includes("Damage") && !battleState.isBattleStarted) return;
        dispatch(castSpell(spellName));
        if (effect.type.includes("Damage")) doSpellDamage(name);
    };

    const doSpellDamage = (spellName: SpellNames) => {
        const hit = spellHit(spellName);
        if (!battleState.enemy) return;
        const hpAfterDamage = Math.max(0, battleState.enemy.currentHp - hit.damage);
        dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${hit.damage}${hit.wasCrit ? "!" : ""}`}));
        if (hpAfterDamage <= 0) {
            handleEndBattle(dispatch, battleState, playerStats, unlocks);
        }
    };

    if (!spell) return <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>;
    const spellData = SPELLS_DATA[spell.name];
    const {cooldown, url} = spellData;
    const getSpellCooldown = () => cooldown - (cooldown > 10 ? playerStats.cooldownReduction : 0);

    const passedTime = (spell.currentCooldown / getSpellCooldown()) * 100;
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
