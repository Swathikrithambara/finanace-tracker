import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/signin", { replace: true });
  };

  return (
    <header className="flex justify-between px-8 py-4 border-b border-white/10">
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-semibold text-black">
          Welcome back,{" "}
          <span className="font-bold">
            {user?.name || "User"}
          </span>
        </h3>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-[#7a2828] text-white text-sm"
      >
        Logout
      </button>
    </header>
  );
}
