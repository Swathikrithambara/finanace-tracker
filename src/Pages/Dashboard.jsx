import SummaryCard from "../Components/Summary";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
  const transactions = JSON.parse(localStorage.getItem("txs") || "[]");

  const incomes = transactions.filter((t) => t.amount > 0);
  const expenses = transactions.filter((t) => t.amount < 0);

  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const totalTransactions = transactions.length;

  // Donut chart data
  const chartConfig = {
    type: "doughnut",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [totalIncome, Math.abs(totalExpenses)],
          backgroundColor: ["#A8E6A1", "#FFCCB6"],
          borderColor: ["#7FBF78", "#E8A095"],
          borderWidth: 2,
          cutout: "60%",
        },
      ],
    },
    options: {
      plugins: {
        legend: { position: "bottom" },
      },
    },
  };

  const chartUrl = "https://quickchart.io/chart?c=" +
    encodeURIComponent(JSON.stringify(chartConfig));

  // NEW: Get the latest 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  return (
 
 

  <div className="space-y-10">

    {/* ─── Summary Cards ─── */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SummaryCard title="Income" value={`₹${totalIncome}`} accent="green" />
      <SummaryCard title="Expenses" value={`₹${Math.abs(totalExpenses)}`} accent="red" />
      <SummaryCard title="Total Transactions" value={totalTransactions} accent="neutral" />
    </div>

    {/* ─── Chart + All Transactions Side-by-Side Row ─── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Section — All Transactions */}
      <section className="lg:col-span-2 glass p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">All Transactions</h2>

          <a
            href="/transactions"
            className="text-sm text-blue-300 hover:text-blue-200 underline"
          >
            View All
          </a>
        </div>

        <TransactionList transactions={transactions.slice(0, 10)} />
      </section>

      {/* Right Section — Donut Chart */}
      <div className="glass p-6 rounded-2xl">
        <Chart income={totalIncome} expenses={totalExpenses} />
      </div>
    </div>

    {/* ─── Income Only Section ─── */}
    <section className="glass p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Income Only</h2>

        <a
          href="/income"
          className="text-sm text-blue-300 hover:text-blue-200 underline"
        >
          View All
        </a>
      </div>

      <TransactionList transactions={incomes.slice(0, 10)} />
    </section>

    {/* ─── Expense Only Section ─── */}
    <section className="glass p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Expense Only</h2>

        <a
          href="/expenses"
          className="text-sm text-blue-300 hover:text-blue-200 underline"
        >
          View All
        </a>
      </div>

      <TransactionList transactions={expenses.slice(0, 10)} />
    </section>

  </div>
);



  
}
