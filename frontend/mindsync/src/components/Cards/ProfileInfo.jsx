import React from 'react'
import { getInitials } from '../../utils/helper'
import { IoMdLogOut } from 'react-icons/io'

const ProfileInfo = ({ onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials("Sidd Chat")}</div>

      <div className='flex flex-col items-end'>
        <p className='text-sm font-bold uppercase'>Sidd</p>
        <button className=' flex flex-row items-center gap-1 text-sm font-medium text-slate-700 underline cursor-pointer' onClick={onLogout}>
          Logout
          <IoMdLogOut className='text-xs'/>
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo