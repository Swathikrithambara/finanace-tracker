import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ monthlyData, type = "income" }) {
  const labels = Object.keys(monthlyData);
  const values = Object.values(monthlyData);

  // fallback to at least one bar to avoid blank chart
  const safeValues = values.length > 0 ? values : [0];
  const safeLabels = labels.length > 0 ? labels : ["No Data"];

  // Different colors for income vs expenses
  const barColor =
    type === "income"
      ? "rgba(142, 197, 252, 0.8)" // pastel blue
      : "rgba(255, 207, 223, 0.8)"; // pastel peach

  const borderColor =
    type === "income" ? "rgba(142, 197, 252, 1)" : "rgba(255, 207, 223, 1)";

  const data = {
    labels: safeLabels,
    datasets: [
      {
        label: type === "income" ? "Income" : "Expenses",
        data: safeValues,
        backgroundColor: barColor,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: "#ffffff" }, // white legend
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // label text
          font: { size: 12 },
        },
        grid: {
          color: "rgba(255,255,255,0.1)", // faint lines
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
