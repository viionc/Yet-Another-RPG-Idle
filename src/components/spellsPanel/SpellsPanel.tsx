import { useSelector } from 'react-redux'
import { GameState } from '../../store'

import SpellSlot from './SpellSlot'

function SpellsPanel() {
  const playerSpells = useSelector((state: GameState) => state.playerSpells)

  return (
    <section className="col-span-2 col-start-2 row-start-2 p-2 bg-neutral-800 h-[5rem] grid grid-cols-10 gap-2 rounded-md">
      {playerSpells.spellsQuickBar.map((spell, index) => {
        return (
          <SpellSlot
            key={index}
            spell={spell}
            index={index}
          />
        )
      })}
    </section>
  )
}

export default SpellsPanel
