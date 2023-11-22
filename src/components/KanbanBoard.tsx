import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { Column, Id, Task } from '@/types'
import ColumnContainer from './ColumnContainer'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import TaskCard from './TaskCard'

const defaultCols: Column[] = [
  {
    id: 'todo',
    title: 'TODO',
  },
  {
    id: 'in_progress',
    title: 'IN PROGRESS',
  },
  {
    id: 'done',
    title: 'DONE',
  },
]

const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    content: 'Example todo item',
  },
]

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [tasks, setTasks] = useState<Task[]>(defaultTasks)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            type="button"
            className="flex h-[60px] w-[360px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-card p-4 font-mono text-secondary-foreground ring-accent-foreground hover:ring-2"
            onClick={() => {
              createNewColumn()
            }}
          >
            <PlusCircleIcon className="h-6 w-6" /> Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }
    setTasks([...tasks, newTask])
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task
      }
      return { ...task, content }
    })
    setTasks(newTasks)
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd])
  }
  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((task) => task.columnId !== id)
    setTasks(newTasks)
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, title }
    })
    setColumns(newColumns)
  }

  function onDragStart(event: DragStartEvent) {
    console.log('DRAG START', event)
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      )

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      )

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeTaskId = active.id
    const overTaskId = over.id

    if (activeTaskId === overTaskId) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'

    if (!isActiveTask) {
      return
    }

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTaskId)
        const overIndex = tasks.findIndex((t) => t.id === overTaskId)

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverColumn = over.data.current?.type === 'Column'

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTaskId)

        tasks[activeIndex].columnId = overTaskId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}

function generateId() {
  // Generate a random number between 0 and 10000
  return Math.floor(Math.random() * 10001)
}

export default KanbanBoard
