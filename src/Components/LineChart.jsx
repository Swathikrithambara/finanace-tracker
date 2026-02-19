import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
   Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,Filler,
);

export default function LineChart({ monthlyData }) {
  const labels = Object.keys(monthlyData);
  const values = Object.values(monthlyData);

  const data = {
    labels,
    datasets: [
      {
        label: "Net Flow",
        data: values,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

 return (
  <div className="h-[300px] w-full">
    <Line
      data={data}
      options={{
        ...options,
        maintainAspectRatio: false,
      }}
    />
  </div>
);

  

}
