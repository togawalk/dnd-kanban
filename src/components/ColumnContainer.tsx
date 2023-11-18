import {
  EllipsisVerticalIcon,
  MinusIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { Column, Id, Task } from '@/types'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useMemo, useState } from 'react'
import TaskCard from './TaskCard'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void
  createTask: (columnId: Id) => void
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
  tasks: Task[]
}

function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props
  const [editMode, setEditMode] = useState(false)

  const [tasksListLength, settasksListLength] = useState(tasks.length)

  useEffect(() => {
    settasksListLength(tasks.length)
  }, [tasks])

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex w-[350px] flex-col rounded-md border-2 border-rose-500 bg-gray-100 opacity-40 dark:bg-secondary"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-[350px] flex-col rounded-md bg-gray-200 dark:bg-secondary"
    >
      <div className="flex h-[60px] items-center justify-between  gap-4 rounded-md rounded-b-none border-4 p-3 font-bold dark:border-secondary dark:bg-background">
        <div className="flex flex-1 items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab rounded px-1 py-1 hover:bg-gray-300 hover:stroke-white dark:hover:bg-secondary"
          >
            <EllipsisVerticalIcon className="h-6 stroke-gray-500 " />
          </div>
          <div
            onDoubleClick={() => setEditMode(true)}
            className="h-6 w-full dark:text-slate-200"
          >
            {!editMode && column.title}
            {editMode && (
              <input
                className="w-full rounded bg-black outline-none"
                autoFocus
                onChange={(e) => updateColumn(column.id, e.target.value)}
                value={column.title}
                onBlur={() => {
                  setEditMode(false)
                }}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return
                  setEditMode(false)
                }}
              />
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-2">
          <div className="flex items-center justify-center py-1 text-gray-500">
            {tasksListLength}
          </div>
          <button
            type="button"
            className="rounded px-1 py-1 hover:bg-gray-300 hover:stroke-white dark:hover:bg-secondary"
            onClick={() => {
              deleteColumn(column.id)
            }}
          >
            <MinusIcon className="h-6 stroke-gray-500 " />
          </button>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-md border-2 p-4 hover:bg-gray-300 hover:text-rose-500 dark:border-secondary dark:text-slate-200 dark:hover:bg-background dark:hover:text-rose-500"
        onClick={() => {
          createTask(column.id)
        }}
      >
        <PlusCircleIcon className="h-6 w-6" /> Add task
      </button>
    </div>
  )
}

export default ColumnContainer
