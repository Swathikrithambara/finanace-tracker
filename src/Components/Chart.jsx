import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ income, expenses }) {
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, Math.abs(expenses)],
        backgroundColor: [    "#14452F", "#800020"], // pastel colors
        borderColor: "#D1D1DE",
        borderWidth: 1,
        cutout: "65%", // donut style
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Spending Chart</h3>

      <div className="p-4 rounded-xl glass">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
