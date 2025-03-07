import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {

  const [ inputTag, setInputTag ] = useState('');

  const handleInputTag = (e) => {
    setInputTag(e.target.value);
  }

  const handleAddTag = () => {
    if (inputTag.trim() === '') return;

    setTags([...tags, inputTag.trim()]);
    setInputTag('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
          {tags.map((tag, index) => (
            <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
              # {tag}
              <button onClick={() => {handleRemoveTag(tag)}}>
                <MdClose />
              </button>
            </span>
            ))}
        </div>
      )}

      <div className='flex items-center gap-4 mt-3'>
        <input
        type='text'
        value={inputTag}
        className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
        placeholder='Add tag...'
        onChange={handleInputTag}
        onKeyDown={handleKeyDown}
        />

        <button
          className='w-8 h-8 flex items-center justify-center rounded border border-white hover:bg-white transition-all duration-200 ease-in-out'
          onClick={() => {handleAddTag()}}
        >
          <MdAdd className='text-2xl text-black'/>
        </button>
      </div>
    </div>
  )
}

export default TagInput