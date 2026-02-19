import React from "react";

export default function SummaryCard({ title, value, subtitle, accent = "green" }) {
  const accentClass = accent === "green" ? "text-green-400" : "text-red-400";
  return (
    <div className="p-6 rounded-2xl glass-light shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className={`text-3xl font-bold mt-2 ${accentClass}`}>{value}</div>
        </div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}
