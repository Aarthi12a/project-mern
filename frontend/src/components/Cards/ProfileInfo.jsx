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
    <>
      {userInfo && (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
            {getInitials(`${userInfo?.firstName} ${userInfo?.lastName}`)}
          </div>
          <div>
            <p className="text-sm font-medium">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <button
              className="text-sm text-slate-700 underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
