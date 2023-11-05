import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { Column, Id, Task } from '../types'
import ColumnContainer from './ColumnContainer'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { restrictToParentElement } from '@dnd-kit/modifiers'

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        modifiers={[restrictToParentElement]}
        sensors={sensors}
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
            className="flex h-[60px] w-[360px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-secondary bg-background p-4 ring-rose-500 hover:ring-2"
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
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generatedId(),
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
      id: generatedId(),
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
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

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
}

function generatedId() {
  // Generate a random number between 0 and 10000
  return Math.floor(Math.random() * 10001)
}

export default KanbanBoard
