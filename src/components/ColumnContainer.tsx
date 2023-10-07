import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Column, Id } from '../types'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props
  return (
    <div className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-secondary">
      <div className="text-md flex h-[60px] cursor-grab items-center  justify-between rounded-md rounded-b-none border-4 border-secondary bg-background p-3 font-bold">
        <div className="flex items-center gap-2">{column.title}</div>
        <div className="flex gap-1">
          <div className="flex items-center justify-center py-1 text-gray-500">
            0
          </div>
          <button
            type="button"
            className="rounded px-1 py-1 hover:bg-secondary hover:stroke-white"
            onClick={() => {
              deleteColumn(column.id)
            }}
          >
            <EllipsisVerticalIcon className="h-6 stroke-gray-500 " />
          </button>
        </div>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  )
}

export default ColumnContainer
