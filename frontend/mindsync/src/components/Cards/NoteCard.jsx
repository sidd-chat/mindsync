import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import {MdCreate, MdDelete} from 'react-icons/md'

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const NoteCard = (note) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all duration-300 ease-in-out'>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{note.title}</h6>
          <span className='text-xs text-slate-500'>{note.date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon=btn cursor-pointer ${note.isPinned ? 'text-black-700' : 'text-slate-500'}`}
          onClick={note.onPinNote} />
      </div>

      <p className='text-xs text-slate-600 mt-2'>{note.content?.slice(0,60)}</p>

      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>#{note.tags}</div>
        <div className='flex items-center gap-2'>
          <MdCreate className='icon-btn hover:text-green-600 cursor-pointer' onClick={note.onEdit} />
          <MdDelete className='icon-btn hover:text-red-600 cursor-pointer' onClick={note.onDelete} />
        </div>
      </div>
    </div>
  )
}

export default NoteCard