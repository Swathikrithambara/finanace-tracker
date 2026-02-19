import React from "react";

export default function TransactionItem({ t, onDelete }) {
  const isIncome = t.amount > 0;

  return (
    <li className="flex items-center justify-between p-3 rounded-xl glass mb-3">

     
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center
            ${isIncome ? "bg-green-500/20" : "bg-red-500/20"}`}
        >
          <span className={isIncome ? "text-green-300" : "text-red-300"}>
            {isIncome ? "+" : "-"}
          </span>
        </div>

        <div>
          <div className="text-white font-medium">{t.text}</div>
          <div className="text-xs text-gray-400">{t.category}</div>
        </div>
      </div>

    
      <div className="flex items-center gap-3">
        <div className={isIncome ? "text-green-300" : "text-red-300"}>
          ₹{Math.abs(t.amount)}
        </div>

      
        <button
          onClick={() => onDelete(t.created_at)}
          className="text-red-400 hover:text-red-200 transition text-lg"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
