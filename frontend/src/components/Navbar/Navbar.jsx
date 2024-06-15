import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { FaRegStickyNote } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ userInfo, handleSearch }) {
  const [SearchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
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

  return (
    <>
      <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <a onClick={handleIconClick} className="text-xl font-medium text-black py-2 "><FaRegStickyNote className="text-xl font-medium text-black" size={42} /></a>

        <SearchBar
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          handleSearch={() => {
            handleSearch(SearchQuery);
          }}
          clearSearch={() => {clearSearch()}}
          value={SearchQuery}
        />

        <ProfileInfo userInfo={userInfo} />
      </nav>
    </>
  );
}
