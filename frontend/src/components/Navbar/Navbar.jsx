import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useState } from 'react'

export default function Navbar({userInfo}) {

  const [SearchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {

  }

  const clearSearch = () => {
    setSearchQuery('');
  }

  return (
    <>
        <nav className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2 '>Notes</h2>

            <SearchBar onChange={(e) => {setSearchQuery(e.target.value)}}
              handleSearch={handleSearch}
              clearSearch={clearSearch}
              value={SearchQuery}
              />

            <ProfileInfo userInfo={userInfo}/>
        </nav>
    </>
  )
}
