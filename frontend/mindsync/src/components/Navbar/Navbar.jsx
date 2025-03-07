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
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>MindSync</h2>

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