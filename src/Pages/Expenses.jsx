import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BarChart from "../components/BarChart";

export default function Expenses() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("txs") || "[]")
  );

  
  const expenses = transactions.filter((t) => t.amount < 0);

  
  // 1. GROUP BY MONTH (FOR BAR CHART)
 
  const monthlyExpenses = {};
  expenses.forEach((t) => {
    const month = new Date(t.created_at).toLocaleString("default", {
      month: "short",
    });
    monthlyExpenses[month] =
      (monthlyExpenses[month] || 0) + Math.abs(t.amount);
  });

 
  // 2. GROUP BY CATEGORY
 
  const expenseSources = {};
  expenses.forEach((t) => {
    const category = t.category || "Uncategorized";
    expenseSources[category] =
      (expenseSources[category] || 0) + Math.abs(t.amount);
  });

 
  // 3. MONTH-TO-MONTH COMPARISON
 
  const months = Object.keys(monthlyExpenses);
  const currentMonth = months[months.length - 1] || null;
  const previousMonth = months[months.length - 2] || null;

  const currentValue = currentMonth ? monthlyExpenses[currentMonth] : 0;
  const previousValue = previousMonth ? monthlyExpenses[previousMonth] : 0;

  const difference = currentValue - previousValue;

 
  // 4. ADD / DELETE EXPENSE LOGIC
  
  const deleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.created_at !== id);
    setTransactions(updated);
    localStorage.setItem("txs", JSON.stringify(updated));
  };

  const addExpense = (t) => {
    t.amount = -Math.abs(t.amount); // force negativenumbers
    const updated = [t, ...transactions];
    setTransactions(updated);
    localStorage.setItem("txs", JSON.stringify(updated));
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl text-white font-bold">Expenses</h1>

        <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Add Expense</h2>
        <TransactionForm addTransaction={addExpense} />
      </div>
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Monthly Expense Chart</h2>
        <BarChart monthlyData={monthlyExpenses} />
      </div>

    
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Compared to Previous Month</h2>

        <p className="text-white text-xl">
          {difference >= 0
            ? `▲ Increased by ₹${difference}`
            : `▼ Decreased by ₹${Math.abs(difference)}`}
        </p>
      </div>

    
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Expense Categories</h2>

        {Object.keys(expenseSources).length === 0 && (
          <p className="text-gray-300">No expenses recorded</p>
        )}

        {Object.keys(expenseSources).map((cat) => (
          <div key={cat} className="flex justify-between text-white mb-2">
            <span>{cat}</span>
            <span className="font-semibold">₹{expenseSources[cat]}</span>
          </div>
        ))}
      </div>

    
     

      
      <div className="glass p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg text-white">Expense List</h2>

          <a
            href="/expenses"
            className="text-sm text-blue-300 hover:text-blue-200 underline"
          >
            View All
          </a>
        </div>

        <TransactionList
          transactions={expenses}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}
