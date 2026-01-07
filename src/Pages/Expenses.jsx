import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BarChart from "../components/BarChart";

import { useAuth } from "../auth/AuthContext";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../Services/TransactionService";
import { Link } from "react-router-dom";

export default function Expenses() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      const all = await getTransactions(user.uid);
      const expenseOnly = all.filter((t) => t.amount < 0);
      setTransactions(expenseOnly);
      setLoading(false);
    };

    fetchExpenses();
  }, [user]);

  const handleAddExpense = async (transaction) => {
    if (!user) return;

    const expenseTx = {
      ...transaction,
      amount: -Math.abs(transaction.amount), // force negative
      created_at: new Date(),
    };

    await addTransaction(user.uid, expenseTx);
    setTransactions((prev) => [expenseTx, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!user) return;

    await deleteTransaction(user.uid, id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) {
    return <p className="text-white">Loading expenses...</p>;
  }

  // Monthly grouping
  const monthlyExpenses = {};
  transactions.forEach((t) => {
    const date = t.created_at?.seconds
      ? new Date(t.created_at.seconds * 1000)
      : new Date(t.created_at);

    const month = date.toLocaleString("default", { month: "short" });

    monthlyExpenses[month] =
      (monthlyExpenses[month] || 0) + Math.abs(t.amount);
  });

  return (
    <div className="space-y-10">
      <h1 className="text-3xl text-black font-bold">Expenses</h1>

      {/* Monthly Chart */}
     
      {/* Add Expense */}
      {/* <Link to="/add-expense" className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Add Expense</h2>
        <TransactionForm addTransaction={handleAddExpense} />
      </Link> */}


<Link
    to="/add-expense"
    className="px-4 py-2 rounded-lg bg-[#434343] hover:bg-red-500 text-white font-medium transition"
  >
    + Add Your Expense
  </Link>




      {/* Expense List */}
      <div className=" p-6 rounded-2xl">
        <h2 className="text-lg text-black mb-3">Expense List</h2>
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
        />
      </div>
       <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">
          Monthly Expense Chart
        </h2>
        <BarChart monthlyData={monthlyExpenses} type="expense" />
      </div>

    </div>
  );
}
