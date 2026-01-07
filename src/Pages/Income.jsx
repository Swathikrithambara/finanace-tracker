import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BarChart from "../components/BarChart";

import { useAuth } from "../auth/AuthContext";
import {
  deleteTransaction,
  getTransactions,
  addTransaction,
} from "../Services/TransactionService";
import { Link } from "react-router-dom";

export default function Income() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchIncome = async () => {
      const all = await getTransactions(user.uid);
      const incomeOnly = all.filter((t) => t.amount > 0);
      setTransactions(incomeOnly);
      setLoading(false);
    };

    fetchIncome();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user) return;

    await deleteTransaction(user.uid, id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddIncome = async (transaction) => {
    if (!user) return;

    const incomeTx = {
      ...transaction,
      amount: Math.abs(transaction.amount), // force positive
      created_at: new Date(),
    };

    await addTransaction(user.uid, incomeTx);

    // refresh list
    setTransactions((prev) => [incomeTx, ...prev]);
  };

  if (loading) {
    return <p className="text-black">Loading income...</p>;
  }

  // Monthly grouping
  const monthlyIncome = {};
  transactions.forEach((t) => {
    const month = new Date(t.created_at.seconds
      ? t.created_at.seconds * 1000
      : t.created_at
    ).toLocaleString("default", { month: "short" });

    monthlyIncome[month] =
      (monthlyIncome[month] || 0) + t.amount;
  });

  return (
    <div className="space-y-10">
      <h1 className="text-3xl text-[#00223e
] font-bold">Income</h1>

     <Link
    to="/add-income"
    className="px-4 py-2 rounded-lg bg-[#003459] text-white font-medium transition"
  >
    + Add Your Income
  </Link>


      {/* <Link  to="/add-income" className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Add Income</h2>
        <TransactionForm addTransaction={handleAddIncome} />
      </Link> */}

      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-[#00223e
] mb-3">Income List</h2>
        <TransactionList transactions={transactions}
        onDelete={handleDelete} />
      </div>
       <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-[#00223e
] mb-3">
          Monthly Income Chart
        </h2>
        <BarChart monthlyData={monthlyIncome} type="income" />
      </div>
    </div>
  );
}
