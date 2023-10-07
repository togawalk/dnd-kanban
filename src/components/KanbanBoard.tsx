import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Column, Id } from '../types'
import ColumnContainer from './ColumnContainer'

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  console.log(columns)

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer column={col} deleteColumn={deleteColumn} />
          ))}
        </div>
        <button
          type="button"
          className="flex h-[60px] w-[360px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-background p-4 ring-rose-500 hover:ring-2"
          onClick={() => {
            createNewColumn()
          }}
        >
          <PlusCircleIcon className="h-6 w-6" /> Add Column
        </button>
      </div>
    </div>
  )
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generatedId(),
      title: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd])
  }
  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)
  }
}

function generatedId() {
  // Generate a random number between 0 and 10000
  return Math.floor(Math.random() * 10001)
}

export default KanbanBoard
