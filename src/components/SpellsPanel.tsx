import {useSelector} from "react-redux";
import {RootState} from "../gameState/store";

import SpellSlot from "./SpellSlot";

function SpellsPanel() {
    const playerSpells = useSelector((state: RootState) => state.playerSpells);

    return (
        <section className="col-span-2 col-start-2 row-start-2 border rounded-md p-2 border-slate-800 bg-neutral-800 h-[5rem] grid grid-cols-10 gap-2">
            {playerSpells.spellsQuickBar.map((spell, index) => {
                return <SpellSlot key={index} spell={spell} index={index}></SpellSlot>;
            })}
        </section>
    );
}

export default SpellsPanel;
