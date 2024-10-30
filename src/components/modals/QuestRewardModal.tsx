import { useDispatch } from 'react-redux'
import { hideQuestCompletedModal } from '../../store/quests-state'
import QUEST_DATA from '../../data/questsData'
import ITEM_DATA from '../../data/itemsData'
import CloseButton from '../ui/CloseButton'
import { QuestIds } from '../../consts/enums/ids/quest-ids.enum'
import { RewardType } from '../../consts/enums/reward-type.enum'

function QuestRewardModal({ id }: { id: QuestIds }) {
  const dispatch = useDispatch()

  const close = () => dispatch(hideQuestCompletedModal())
  const { name, rewards } = QUEST_DATA[id]
  return (
    <article
      className="absolute top-0 left-0 bg-opacity-25 bg-black border-slate-800 w-full h-full text-white flex justify-center items-center z-[250]"
      onClick={close}
    >
      <div
        className="bg-zinc-800 min-h-[33%] w-1/3 mb-52 p-6 rounded-md border-slate-700 border relative z-[110]"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          callback={close}
          position="top-right"
        />
        <h1 className="text-2xl text-yellow-500 mb-6">{name} Completed!</h1>
        <h2 className="mb-2">Rewards:</h2>
        <ul className="flex flex-col gap-2">
          {rewards.map((reward, index) => {
            if (reward.type === RewardType.item) {
              const { name } = ITEM_DATA[reward.id]
              return (
                <li key={index}>
                  {reward.amount} {name}
                </li>
              )
            } else if (reward.type === RewardType.stat) {
              return (
                <li key={index}>
                  {reward.amount} {reward.label}
                </li>
              )
            }
          })}
        </ul>
      </div>
    </article>
  )
}

export default QuestRewardModal
