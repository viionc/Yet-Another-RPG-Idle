import {useState} from "react";
import {QuickBarSpell} from "../gameState/storeSlices/playerSpells";
import {usePopper} from "react-popper";
import {useDispatch, useSelector} from "react-redux";
import SPELLS_DATA, {SpellNames} from "../data/spellsData";
import {castSpell, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {RootState} from "../gameState/store";
import {calculateSpellDamage, handleEndBattle} from "../tickHandler/battleInterval";

export type SpellSlotProps = {
    spell: QuickBarSpell | null;
    index: number;
};

function SpellSlot({spell, index}: SpellSlotProps) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const playerSpells = useSelector((state: RootState) => state.playerSpells);
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const battleState = useSelector((state: RootState) => state.battleState);

    const handleClick = (spellName: SpellNames, quickBarIndex: number) => {
        const spell = SPELLS_DATA[spellName];
        const quickBarSpell = playerSpells.spellsQuickBar[quickBarIndex] as QuickBarSpell;
        if (spell.manaCost > playerStats.mana || quickBarSpell.currentCooldown > 0) return;
        if (spell.effect.spellType === "Damage" && !battleState.isBattleStarted) return;
        dispatch(castSpell(spellName));
        if (spell.effect.spellType === "Damage") doSpellDamage(spell.name);
    };

    const doSpellDamage = (spellName: SpellNames) => {
        const hit = calculateSpellDamage(spellName, playerStats);
        if (!battleState.enemy) return;
        const hpAfterDamage = Math.max(0, battleState.enemy.currentHp - hit.damage);
        console.log(hpAfterDamage);
        dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${hit.damage}${hit.wasCrit ? "!" : ""}`}));
        if (hpAfterDamage <= 0) {
            handleEndBattle(dispatch, battleState, playerStats);
        }
    };

    if (!spell) return <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>;
    const {name, url, description, manaCost} = SPELLS_DATA[spell.name];
    return (
        <div
            ref={setReferenceElement}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => handleClick(spell.name, index)}
            className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer">
            <div className="relative">
                {spell.currentCooldown > 0 ? (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">{spell.currentCooldown}</span>
                ) : null}
                <img src={url}></img>
            </div>

            {show ? (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="p-1 bg-zinc-700 rounded-md border border-slate-800 flex gap-1 flex-col cursor-default select-none">
                    <span className="text-yellow-500">
                        {name}
                        <span className="text-blue-500 ml-2">Mana: {manaCost}</span>
                    </span>
                    <span>{description}</span>
                </div>
            ) : null}
        </div>
    );
}

export default SpellSlot;
