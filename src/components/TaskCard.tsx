import { XCircleIcon } from '@heroicons/react/24/outline'
import { Task } from '../types'

interface Props {
  task: Task
}

function TaskCard({ task }: Props) {
  return (
    <div className="flex items-start gap-2 rounded bg-background p-2">
      <div className="flex-1 self-center">{task.content}</div>
      <button
        type="button"
        className="rounded px-1 py-1 hover:bg-secondary hover:stroke-white"
      >
        <XCircleIcon className="h-6 stroke-gray-500" />
      </button>
    </div>
  )
}

export default TaskCard
