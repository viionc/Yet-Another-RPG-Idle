import { addPoint } from '.'
import { AppDispatch, GameState } from '..'
import { PlayerStatIds } from '../../consts/enums/ids/player-stat-ids'
import { SkillIds } from '../../consts/enums/ids/skill-ids.enum'
import { SkillPointType } from '../../consts/enums/skill-point-type.enum'
import { SpellType } from '../../consts/enums/spell-type.enum'
import { ALL_SKILLS } from '../../data/skillTreesData'
import SPELLS_DATA from '../../data/spellsData'
import { addToQuickBar, unlockSpell } from '../player-spells'
import { decreaseStats, increaseStats } from '../player-stats'

export const addSkillPoint = (id: SkillIds, amount: number) => {
  return (dispatch: AppDispatch, getState: () => GameState) => {
    dispatch(addPoint({ id, amount }))
    dispatch(decreaseStats([{ id: PlayerStatIds.unspentSkillPoints, amount }]))

    const skill = ALL_SKILLS.find((skill) => skill.id === id)

    if (!skill) return

    switch (skill.type) {
      case SkillPointType.stat:
        dispatch(increaseStats([{ id: skill.stat, amount: skill.value * amount }]))
        break
      case SkillPointType.spell: {
        dispatch(unlockSpell({ id: skill.spellId }))
        const spellData = SPELLS_DATA[skill.spellId]
        dispatch(
          addToQuickBar({
            id: skill.spellId,
            cooldown: spellData.baseCooldown,
            duration: spellData.effect?.type === SpellType.supportBuff ? spellData.effect.duration : undefined,
          }),
        )
        break
      }
      case SkillPointType.battle:
        break
      default:
      // do nothing
    }
  }
}
