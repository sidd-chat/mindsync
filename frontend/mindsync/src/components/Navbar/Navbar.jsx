import React, {useState, useEffect, useRef} from 'react'
import ProfileInfo  from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo}) => {

  const navigate = useNavigate();

  const [ search, setSearch ] = React.useState('');

  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        searchBarRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const onSearch = () => {

  }

  return (
    <div className='bg-black flex items-center justify-between px-6 py-10 mb-20 drop-shadow-md gap-4'>
      <span className='flex items-center gap-4 cursor-pointer' onClick={() => navigate('/')}>
        {/* <img src='./logo.png' alt='logo' className='w-10 h-10'/> */}
        <h2 className='text-3xl font-bold font-mono text-white py-2'>M i n d S y n c</h2>
      </span>

      {/* userInfo && ( */}
        <SearchBar
          ref={searchBarRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          handleSearch={onSearch}
          onClearSearch={() => setSearch('')}
        />
      {/* ) */}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar