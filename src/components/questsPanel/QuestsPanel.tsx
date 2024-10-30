import { useState } from 'react'
import { useSelector } from 'react-redux'
import QuestListElement from './QuestListElement'
import { selectStartedQuests, selectCompletedQuests } from '../../store/quests-state/quests-state.selectors'

function QuestsPanel() {
  const [filter, setFilter] = useState('Started')

  const startedQuests = useSelector(selectStartedQuests)
  const completedQuests = useSelector(selectCompletedQuests)

  return (
    <section className="col-span-1 col-start-4 row-start-2 row-span-2 p-2 bg-neutral-800 shadow-md rounded-md">
      <h1 className="mb-2">Quests:</h1>
      <div className="w-full flex gap-2 mb-2">
        <button
          className="w-full px-1 py-1 border rounded-md hover:bg-yellow-500 hover:text-black"
          onClick={() => setFilter('Started')}
        >
          Started
        </button>
        <button
          className="w-full px-1 py-1 border rounded-md hover:bg-yellow-500 hover:text-black"
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </div>
      {filter === 'Started' ? (
        <ul>
          {startedQuests.map((quest) => (
            <QuestListElement
              key={quest.id}
              id={quest.id}
              step={quest.currentProgress}
              type="started"
            />
          ))}
        </ul>
      ) : (
        <ul>
          {completedQuests.map((quest) => (
            <QuestListElement
              key={quest.id}
              id={quest.id}
              step={quest.currentProgress}
              type="completed"
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default QuestsPanel
