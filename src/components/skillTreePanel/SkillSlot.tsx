import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GameState, thunkDispatch } from '../../store'
import useTooltip from '../../hooks/useTooltip'
import Tooltip from '../tooltip/Tooltip'
import { addSkillPoint } from '../../store/player-skills/player-skills.thunks'
import { SkillPoints } from '../../consts/interfaces/skill-tree.interfaces'

function SkillSlot({ skill }: { skill: SkillPoints }) {
  const [show, setShow] = useState(false)
  const { refs, floatingStyles, getFloatingProps, getReferenceProps } = useTooltip({ show, setShow })

  const playerSkills = useSelector((state: GameState) => state.playerSkills)
  const { unspentSkillPoints } = useSelector((state: GameState) => state.playerStats)
  const currentSkillPointLevel = playerSkills[skill.id] ?? 0
  const isMaxLevel = currentSkillPointLevel === skill.maxLevel

  const spendSkillPoint = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMaxLevel || !unspentSkillPoints || unspentSkillPoints < skill.skillPointCost) return
    const skillLevel = playerSkills[skill.id] ?? 0
    const amount = event.ctrlKey ? Math.min(unspentSkillPoints, skill.maxLevel - skillLevel) : 1
    thunkDispatch(addSkillPoint(skill.id, amount))
  }

  return (
    <>
      <div
        className={`border flex justify-center items-center border-zinc-600 bg-zinc-800 flex-col bg-no-repeat bg-cover bg-center bg-origin-content cursor-pointer ${
          skill.special ? 'rounded-full' : 'rounded-md'
        } ${isMaxLevel ? 'bg-green-700' : 'bg-zinc-700'}`}
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={(e) => spendSkillPoint(e)}
        style={{ gridRowStart: skill.row, gridColumnStart: skill.col, backgroundImage: `url('${skill.url}')` }}
      >
        <div className="bg-black bg-opacity-[60%] p-1 rounded-md flex flex-col items-center select-none">
          <div className={`${isMaxLevel ? 'text-green-500' : 'text-white'}`}>
            {currentSkillPointLevel} / {skill.maxLevel}
          </div>
          {!isMaxLevel ? <div>{skill.skillPointCost} SP</div> : null}
        </div>
      </div>
      {show ? (
        <Tooltip
          data={{ type: 'skill', skill }}
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
        />
      ) : null}
    </>
  )
}

export default SkillSlot
