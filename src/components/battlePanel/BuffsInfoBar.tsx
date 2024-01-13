import SPELLS_DATA from "../../data/spellsData";
import {PlayerSpellsProps} from "../../gameState/storeSlices/playerSpells";

type BuffsInfoBarProps = {
    playerSpells: PlayerSpellsProps;
};

function BuffsInfoBar({playerSpells}: BuffsInfoBarProps) {
    return (
        <ul className="absolute bottom-1 left-1 flex gap-2">
            {playerSpells.activeSpells.map((spell) => {
                const spellData = SPELLS_DATA[spell.name];
                return (
                    <li className="w-12 h-12 relative" key={spell.name}>
                        <img src={spellData.url} className="h-12 w-12" alt={`${spellData.name} spell buff`}></img>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">{spell.currentDuration}</span>
                    </li>
                );
            })}
        </ul>
    );
}

export default BuffsInfoBar;
