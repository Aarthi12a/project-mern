import React from "react";
import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo({ userInfo }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    userInfo && (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full bg-gray-500 text-white font-bold">
          {getInitials(`${userInfo.firstName} ${userInfo.lastName}`)}
        </div>
        <div className="flex flex-col">
          <span className="font-medium">
            {userInfo.firstName} {userInfo.lastName}
          </span>
       <button 
  className="text-red-500 text-xs hover:text-red-700 mt-1 transition-colors duration-200" 
  onClick={handleLogout}
>
  Logout
</button>


        </div>
      </div>
    )
  );
}
