import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // ✅ If already logged in, go to dashboard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!name.trim()) return;

    localStorage.setItem("user", name);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="glass p-8 rounded-2xl w-[350px]">
        <h1 className="text-2xl font-bold text-white mb-4">
          Sign In
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl
                     bg-transparent text-white
                     border border-white/30
                     placeholder-gray-400"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl
                     bg-gradient-to-br from-green-400 to-green-600
                     text-white font-semibold"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}
