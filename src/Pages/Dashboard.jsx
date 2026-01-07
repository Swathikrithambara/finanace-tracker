import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

import TransactionList from "../Components/TransactionList";
import LineChart from "../Components/LineChart";

import { getTransactions } from "../Services/TransactionService";

export default function Dashboard() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      const data = await getTransactions(user.uid);
      setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, [user]);

  if (loading) {
    return <p className="text-white">Loading dashboard...</p>;
  }

  // ---- CALCULATIONS ----
  const incomes = transactions.filter((t) => t.amount > 0);
  const expenses = transactions.filter((t) => t.amount < 0);

  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + Math.abs(b.amount), 0);

  const currentBalance = totalIncome - totalExpenses;

  // ---- LINE CHART DATA (NET FLOW) ----
  // ---- LINE CHART DATA (NET FLOW PER MONTH) ----
// ---- LINE CHART DATA (CUMULATIVE BALANCE OVER TIME) ----
const sortedTx = [...transactions].sort((a, b) => {
  const da = a.created_at?.seconds
    ? a.created_at.seconds * 1000
    : new Date(a.created_at).getTime();

  const db = b.created_at?.seconds
    ? b.created_at.seconds * 1000
    : new Date(b.created_at).getTime();

  return da - db;
});


let runningBalance = 0;
const balanceTrend = {};

sortedTx.forEach((t) => {
  runningBalance += t.amount;

  const date = t.created_at?.seconds
    ? new Date(t.created_at.seconds * 1000)
    : new Date(t.created_at);

  const label = date.toLocaleDateString("default", {
    day: "2-digit",
    month: "short",
  });

  balanceTrend[label] = runningBalance;
});



  return (
    <div className="space-y-10">

      {/* 🟢 GREETING + CURRENT BALANCE */}
     <div
  className="flex  justify-between px-8 py-6 rounded-2xl"
  style={{ backgroundColor: "#2F4A63" }}
>
  <div>
    <p className="text-sm text-gray-300">Your Savings</p>
    <h2 className="text-3xl font-bold text-[#9CAB84] mt-2">
      ₹ {currentBalance}
    </h2>
  </div>
</div>


      {/* 📜 TRANSACTION HISTORY */}
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-white mb-4">
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet</p>
        ) : (
          <TransactionList transactions={transactions.slice(0, 10)} />
        )}
      </div>

      {/* 📈 LINE CHART (BOTTOM) */}
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-white mb-4">
          Cash Flow Trend
        </h2>

         <LineChart monthlyData={balanceTrend} />
      </div>

    </div>
  );
}
