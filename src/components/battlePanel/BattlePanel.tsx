import { useDispatch, useSelector } from 'react-redux'
import { GameState } from '../../store'
import ZONES_DATA from '../../data/zonesData'
import EnemyComponent from './EnemyComponent'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { updateDamageHitSplat } from '../../store/battle-state'
import ZoneInfoBar from './ZoneInfoBar'
import ZonesMap from './ZonesMap'
import BuffsInfoBar from './BuffsInfoBar'
import { selectHasSkillUnlocked } from '../../store/player-skills'
import { SkillIds } from '../../consts/enums/ids/skill-ids.enum'

function BattlePanel() {
  const { zoneId, enemy, damageForHitSplat } = useSelector((state: GameState) => state.battleState)
  const playerSpells = useSelector((state: GameState) => state.playerSpells)
  const { unlocked } = useSelector((state: GameState) => state.playerUnlockedContent)
  const hasWeaknessSkillUnlocked = useSelector(selectHasSkillUnlocked(SkillIds.weaknesses))
  const dispatch = useDispatch()

  const currentZoneData = ZONES_DATA[zoneId]

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(updateDamageHitSplat(''))
    }, 1000)
    return () => clearTimeout(timeout)
  }, [damageForHitSplat, dispatch])

  return (
    <section
      className="col-span-2 bg-center bg-cover bg-no-repeat shadow-md rounded-md"
      style={{ backgroundImage: `url(${currentZoneData.url})` }}
    >
      <div className="w-full h-full relative">
        <ZoneInfoBar />
        <EnemyComponent
          enemy={enemy}
          weaknessesUnlocked={hasWeaknessSkillUnlocked}
        />
        <BuffsInfoBar playerSpells={playerSpells} />
        {unlocked.zonesMap ? <ZonesMap /> : null}
        {damageForHitSplat ? (
          <motion.span
            initial={{ top: '50%', right: '30%' }}
            animate={{ top: '30%', right: '33%' }}
            transition={{ duration: 2, type: 'spring' }}
            className={`absolute text-4xl z-30 flex justify-center items-center ${
              damageForHitSplat.includes('!') ? 'text-yellow-500' : 'text-white'
            }`}
          >
            {damageForHitSplat}
          </motion.span>
        ) : null}
      </div>
    </section>
  )
}

export default BattlePanel
