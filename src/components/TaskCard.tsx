import { MinusIcon } from '@heroicons/react/24/outline'
import { Id, Task } from '@/types'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="task flex h-[100px] min-h-[100px] cursor-grab items-start rounded border-2 border-rose-500 bg-background p-2 opacity-30"
      />
    )
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task flex h-[100px] min-h-[100px] cursor-grab items-start gap-2 break-all rounded bg-background bg-gray-300 p-2 ring-2 ring-inset ring-orange-600"
      >
        <textarea
          name=""
          id=""
          className="h-full w-full resize-none rounded border-none bg-transparent focus:outline-none dark:text-white"
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
          <MinusIcon className="h-6 stroke-gray-500" />
        </button>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={toggleEditMode}
      className="task flex h-[100px] min-h-[100px] cursor-grab items-start gap-2 rounded bg-gray-300 p-2 hover:ring-2 hover:ring-inset hover:ring-rose-800 dark:bg-background"
    >
      <p className="my-auto h-[100%] w-full overflow-y-auto whitespace-pre-wrap break-all">
        {task.content}
      </p>
      <button
        onClick={() => {
          deleteTask(task.id)
        }}
        type="button"
        className="rounded px-1 py-1 hover:bg-secondary hover:stroke-white"
      >
        <MinusIcon className="h-6 stroke-gray-500" />
      </button>
    </div>
  )
}

export default TaskCard
