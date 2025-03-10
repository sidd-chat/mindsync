import React from 'react'
import { getInitials } from '../../utils/helper'
import { IoMdLogOut } from 'react-icons/io'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className='flex items-center gap-3'>
        <div className='flex flex-col items-end mt-1'>
          <p className='text-sm text-white font-bold uppercase'>{userInfo.fullName}</p>
          <button className=' flex flex-row items-center gap-1 text-sm font-medium text-yellow-300 underline cursor-pointer' onClick={onLogout}>
            Logout
            <IoMdLogOut className='text-xs'/>
          </button>
        </div>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials(userInfo.fullName)}</div>
      </div>
    )
  )
}

export default ProfileInfo