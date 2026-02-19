import React from "react";
import { useNavigate } from "react-router-dom";


import { FaRegUser } from "react-icons/fa";


export default function Topbar() {
  const navigate = useNavigate();

  // Get the username from localStorage
  const username = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 glass">
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-semibold text-white">
          Welcome back,{" "}
          <span className="font-bold">
            {username ? username : "User"}
          </span>
        </h3>

        <div className="text-sm text-gray-300">
          Your finance overview
        </div>
      </div>

      <div className="flex items-center space-x-4">
       

        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-lg ">
          <FaRegUser />

        </div>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-200 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
