import { XCircleIcon } from '@heroicons/react/24/outline'
import { Id, Task } from '../types'
import { useState } from 'react'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  if (editMode) {
    return (
      <div className="flex min-h-[100px] cursor-grab items-start rounded bg-background p-2 hover:ring-2 hover:ring-inset hover:ring-rose-900">
        <textarea
          name=""
          id=""
          className="h-full w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          spellCheck="false"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
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

  return (
    <div
      onClick={toggleEditMode}
      className="flex min-h-[100px] cursor-grab items-start rounded bg-background p-2 hover:ring-2 hover:ring-inset hover:ring-rose-900"
    >
      <p className="w-full break-all">{task.content}</p>
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
