import React, { forwardRef } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = forwardRef(({ value, onChange, handleSearch, onClearSearch }, ref) => {
  return (
    <div className='w-100 h-10 flex items-center px-10 py-6 bg-slate-100 rounded-3xl opacity-60'>
      <input
        ref={ref}
        type='text'
        value={value}
        onChange={onChange}
        className='w-full text-2xs bg-transparent py-{11px} rounded outline-none'
        placeholder='Press "/" search notes...'
      />

      {value && (
        <IoMdClose
          className='text-xl text-slate-400 cursor-pointer hover:text-red-500 mr-3'
          onClick={onClearSearch}/>
      )}

      <FaMagnifyingGlass className='text-slate-500 cursor-pointer hover:text-yellow-500' onClick={handleSearch}/>
    </div>
  )
})

export default SearchBar