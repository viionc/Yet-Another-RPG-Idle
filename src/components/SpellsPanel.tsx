import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../gameState/store";
import SPELLS_DATA, {SpellNames} from "../data/spellsData";
import {useState} from "react";
import {usePopper} from "react-popper";
import {castSpell} from "../gameState/storeSlices/battleState";

function SpellsPanel() {
    const playerSpells = useSelector((state: RootState) => state.playerSpells);
    const playerStats = useSelector((state: RootState) => state.playerStats);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleClick = (spellName: SpellNames) => {
        const spell = SPELLS_DATA[spellName];
        if (spell.manaCost >= playerStats.mana) return;
        dispatch(castSpell(spellName));
    };
    return (
        <section className="col-span-2 col-start-2 row-start-2 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[5rem] grid grid-cols-10 gap-2">
            {playerSpells.spellsQuickBar.map((spell, index) => {
                if (!spell)
                    return (
                        <div key={index} className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>
                    );
                const {name, url, description, manaCost} = SPELLS_DATA[spell];
                return (
                    <div
                        key={index}
                        ref={setReferenceElement}
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                        onClick={() => handleClick(spell)}
                        className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer">
                        <img src={url}></img>
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
            })}
        </section>
    );
}

export default SpellsPanel;
