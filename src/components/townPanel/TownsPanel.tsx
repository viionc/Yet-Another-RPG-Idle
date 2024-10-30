import { useState } from 'react'
import Town from './Town'
import { TownIds } from '../../consts/enums/ids/town-ids.enum'

function TownsPanel() {
  const [selectedTownId, setSelectedTownId] = useState<null | TownIds>(null)

  return (
    <section className="col-span-2 bg-neutral-800 col-start-2 row-start-1 row-span-2 relative shadow-md rounded-md">
      {selectedTownId === null ? (
        <div className="p-2 flex flex-col">
          <h1 className="mb-2 text-xl">Towns:</h1>
          <button
            onClick={() => setSelectedTownId(TownIds.laHarpar)}
            className="w-1/2 px-2 py-1 text-lg border rounded-md hover:bg-yellow-500 hover:text-black"
          >
            La Harpar
          </button>
        </div>
      ) : (
        <Town
          selectedTownId={selectedTownId}
          close={() => setSelectedTownId(null)}
        />
      )}
    </section>
  )
}

export default TownsPanel
