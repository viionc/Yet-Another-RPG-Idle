import { useState } from 'react'
import { QuickBarSpellProps, SpellPayloadProps, castSpell } from '../../store/player-spells'
import { useDispatch, useSelector } from 'react-redux'
import SPELLS_DATA, { SpellEffectProps } from '../../data/spellsData'
import { GameState } from '../../store'
import { doSpellDamage, getSpellCooldown, getSpellDuration } from '../../utils/combatUtils'
import styles from './SpellSlot.module.css'
import Tooltip from '../tooltip/Tooltip'
import useTooltip from '../../hooks/useTooltip'
import { spellsWithDamage } from '../../consts/spells'
import { SpellIds } from '../../consts/enums/ids/spell-ids.enum'
import { SpellType } from '../../consts/enums/spell-type.enum'

export type SpellSlotProps = {
  spell: QuickBarSpellProps | null
  index: number
}

function SpellSlot({ spell, index }: SpellSlotProps) {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const { refs, floatingStyles, getFloatingProps, getReferenceProps } = useTooltip({ show, setShow })
  const { spellsQuickBar } = useSelector((state: GameState) => state.playerSpells)
  const playerStats = useSelector((state: GameState) => state.playerStats)
  const { isBattleStarted, enemy } = useSelector((state: GameState) => state.battleState)

  const handleClick = (id: SpellIds, quickBarIndex: number) => {
    const { effect, baseManaCost: manaCost, baseCooldown: cooldown } = SPELLS_DATA[id]
    // check if player can cast spell
    if (!canCastSpell(manaCost, effect, quickBarIndex)) return

    const spellCooldown = getSpellCooldown(cooldown, playerStats.cooldownReduction)
    const spellToCast = { id, cooldown: spellCooldown } as SpellPayloadProps
    // add duration to payload if it's a buff spell
    if (effect.type === SpellType.supportBuff) {
      spellToCast.duration = getSpellDuration(effect.duration, playerStats.increasedSpellDuration)
    }
    dispatch(castSpell(spellToCast))
    // if it's a damage type spell run damage calculations
    if (spellsWithDamage.includes(effect.type)) doSpellDamage(dispatch, id, enemy)
  }

  const canCastSpell = (manaCost: number, spellEffect: SpellEffectProps, quickBarIndex: number): boolean => {
    const quickBarSpell = spellsQuickBar[quickBarIndex] as QuickBarSpellProps
    if (
      manaCost > playerStats.mana ||
      quickBarSpell.currentCooldown > 0 ||
      (spellsWithDamage.includes(spellEffect.type) && !isBattleStarted)
    )
      return false
    return true
  }

  // if slot is empty render an empty cell
  if (!spell)
    return (
      <div className="border  flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col"></div>
    )
  const spellData = SPELLS_DATA[spell.id]
  const { baseCooldown: cooldown, url, name } = spellData

  // css magic stuff for a neat background overlay that goes in a "circle" when cooldown goes down
  const passedTime = (spell.currentCooldown / getSpellCooldown(cooldown, playerStats.cooldownReduction)) * 100
  if (refs.reference.current) (refs.reference.current as HTMLElement).style.setProperty('--time-left', `${passedTime}%`)

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      onClick={() => handleClick(spell.id, index)}
      className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer"
    >
      <div
        className={`relative w-16 h-16 
                ${styles.spell}
            `}
      >
        {spell.currentCooldown > 0 ? (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
            {spell.currentCooldown}
          </span>
        ) : null}
        <img
          src={url}
          height="auto"
          width="auto"
          className="rounded-md"
          alt={`${name} spell`}
        ></img>
      </div>

      {show ? (
        <Tooltip
          data={{ type: 'spell', spell: spellData }}
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
        />
      ) : null}
    </div>
  )
}

export default SpellSlot
