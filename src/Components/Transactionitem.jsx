import React from "react";

export default function TransactionItem({ t, onDelete }) {
  const isIncome = t.amount > 0;

  return (
    <li className="flex items-center justify-between px-4 py-3 rounded-xl 
    bg-[#283048]/60 mb-3">
  <div className="flex items-center gap-3">
    <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center
      ${isIncome ? "bg-[#6A9113]" : "bg-[#870000]"}`}
    >
      <span className={isIncome ? "text-green-300" : "text-red-300"}>
        {isIncome ? "+" : "-"}
      </span>
    </div>

    <div>
      <p className="text-white font-medium">{t.text}</p>
      <p className="text-xs text-gray-400">{t.category}</p>
    </div>
  </div>

  <div className="flex items-center gap-4">
    <span
      className={`font-semibold ${
        isIncome ? "text-[#414dob]" : "text-[#870000]"
      }`}
    >
      ₹{Math.abs(t.amount)}
    </span>

    {onDelete && (
      <button
        onClick={() => onDelete(t.id)}
        className="text-black hover:text-black"
      >
        ✕
      </button>
    )}
  </div>
</li>

  );
}
