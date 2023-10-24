import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Column, Id } from '../types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props
  const [editMode, setEditMode] = useState(false)

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
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-secondary opacity-40"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-secondary"
    >
      <div className="flex h-[60px] cursor-grab items-center justify-between  gap-4 rounded-md rounded-b-none border-4 border-secondary bg-background p-3 font-bold">
        <div className="flex flex-1 items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="rounded px-1 py-1 hover:bg-secondary hover:stroke-white"
          >
            <EllipsisVerticalIcon className="h-6 stroke-gray-500 " />
          </button>
          <div onClick={() => setEditMode(true)} className="h-6 w-full">
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
