import React, {useState} from 'react'
import ProfileInfo  from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {

  const navigate = useNavigate();

  const [ search, setSearch ] = React.useState('');

  const onLogout = () => {
    navigate('/login');
  }

  const onSearch = () => {

  }

  return (
    <div className='bg-yellow-300 flex items-center justify-between px-6 py-5 drop-shadow-md gap-4'>
      <span className='flex items-center gap-4 cursor-pointer' onClick={() => navigate('/')}>
        <img src='./logo.png' alt='logo' className='w-10 h-10'/>
        <h2 className='text-xl font-medium text-black py-2'>MindSync</h2>
      </span>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        handleSearch={onSearch}
        onClearSearch={() => setSearch('')}
      />

      <ProfileInfo onLogout={onLogout}/>
    </div>
  )
}

export default Navbar