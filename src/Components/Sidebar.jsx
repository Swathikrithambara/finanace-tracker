import { NavLink } from "react-router-dom";

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl 
         ${isActive ? "glass-light text-white" : "glass text-gray-300"}
         hover:scale-[1.03] transition`
      }
    >
      <div className="text-xl">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
<<<<<<< HEAD
    <aside className="w-64 glass min-h-screen p-6 flex flex-col gap-6">
=======
    <aside className="w-54 min-h-screen p-6 flex flex-col gap-6 bg-[#00223E]">
>>>>>>> 0bb6f17012b1e9b5820aed53f2148f701d7112c3
      <div className="text-white font-bold text-xl mb-4">Finance</div>

      <NavItem to="/" label="Dashboard" icon="📊" />
      <NavItem to="/income" label="Income" icon="💰" />
      <NavItem to="/expenses" label="Expenses" icon="💸" />

<<<<<<< HEAD
      <div className="mt-auto text-gray-500">v1.0</div>
=======
     
>>>>>>> 0bb6f17012b1e9b5820aed53f2148f701d7112c3
    </aside>
  );
}
