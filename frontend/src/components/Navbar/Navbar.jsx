import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { FaRegStickyNote } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ userInfo, handleSearch, getAllNotes }) {
  const [SearchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
    getAllNotes();
  };

  const navigate = useNavigate();

  const handleIconClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (SearchQuery.trim() !== '') {
        handleSearch(SearchQuery);
      } else {
        getAllNotes();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [SearchQuery]);

  return (
    <>
      <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <a onClick={handleIconClick} className="text-xl font-medium text-black py-2 "><FaRegStickyNote className="text-xl font-medium text-black" size={42} /></a>

        <SearchBar
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.key === 'Enter') {
              handleKeyPress(e);
            }
          }}
          handleSearch={() => {
            handleSearch(SearchQuery);
          }}
          clearSearch={clearSearch}
          value={SearchQuery}
        />

        <ProfileInfo userInfo={userInfo} />
      </nav>
    </>
  );
}
