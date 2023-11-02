import { XCircleIcon } from '@heroicons/react/24/outline'
import { Id, Task } from '../types'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
}

function TaskCard({ task, deleteTask }: Props) {
  return (
    <div className="flex items-start rounded bg-background p-2">
      <div className="flex-1 self-center overflow-hidden break-words">
        {task.content}
      </div>
      <button
        onClick={() => {
          deleteTask(task.id)
        }}
        type="button"
        className="rounded px-1 py-1 hover:bg-secondary hover:stroke-white"
      >
        <XCircleIcon className="h-6 stroke-gray-500" />
      </button>
    </div>
  )
}

export default TaskCard
