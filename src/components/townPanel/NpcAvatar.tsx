import { useDispatch } from 'react-redux'
import { TownTabNpcProps } from '../../data/townsData'
import { startDialogue } from '../../store/quests-state'
import NPC_Data from '../../data/npcData'

function NpcAvatar({ npc }: { npc: TownTabNpcProps }) {
  const dispatch = useDispatch()
  const npcData = NPC_Data[npc.id]

  return (
    <div
      onClick={() => dispatch(startDialogue({ id: npc.id }))}
      className={`absolute ${npc.position} bg-zinc-800 rounded-md border-slate-700 w-32 h-32 bg-opacity-80 flex justify-center items-center cursor-pointer brightness-[80%] hover:brightness-100`}
    >
      <img
        src={npcData.url}
        height="108"
        width="108"
      />
    </div>
  )
}

export default NpcAvatar
