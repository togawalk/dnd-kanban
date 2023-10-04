import { PlusCircleIcon } from '@heroicons/react/24/outline'

function KanbanBoard() {
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto">
        <button
          type="button"
          className="h-[60px] w-[360px] min-w-[350px] cursor-pointer rounded-lg bg-background border-2 border-secondary p-4 ring-rose-500 hover:ring-2 flex gap-2"
        >
          <PlusCircleIcon className="h-6 w-6" /> Add Column
        </button>
      </div>
    </div>
  )
}

export default KanbanBoard
