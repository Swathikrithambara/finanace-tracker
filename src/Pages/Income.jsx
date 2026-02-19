import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BarChart from "../components/BarChart";

export default function Income() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("txs") || "[]")
  );

  // Filter income only
  const incomes = transactions.filter((t) => t.amount > 0);

  // GROUP BY MONTH
  const monthlyIncome = {};
  incomes.forEach((t) => {
    const month = new Date(t.created_at).toLocaleString("default", { month: "short" });
    monthlyIncome[month] = (monthlyIncome[month] || 0) + t.amount;
  });

  // GROUP BY CATEGORY
  const incomeSources = {};
  incomes.forEach((t) => {
    incomeSources[t.category] = (incomeSources[t.category] || 0) + t.amount;
  });

  // month comparisons
  const months = Object.keys(monthlyIncome);
  const currentMonth = months[months.length - 1] || null;
  const previousMonth = months[months.length - 2] || null;

  const currentValue = currentMonth ? monthlyIncome[currentMonth] : 0;
  const previousValue = previousMonth ? monthlyIncome[previousMonth] : 0;

  const difference = currentValue - previousValue;

  const addIncome = (t) => {
    t.amount = Math.abs(t.amount);
    const updated = [t, ...transactions];
    setTransactions(updated);
    localStorage.setItem("txs", JSON.stringify(updated));
  };

  return (
    <div className="space-y-10">

      <h1 className="text-3xl text-white font-bold">Income</h1>

 <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Add Income</h2>
        <TransactionForm addTransaction={addIncome} />
      </div>

     
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Monthly Income Chart</h2>
        <BarChart monthlyData={monthlyIncome} />
      </div>

      
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Compared to Previous Month</h2>
        <p className="text-white text-xl">
          {difference >= 0 ? 
            `▲ Increased by ₹${difference}` : 
            `▼ Decreased by ₹${Math.abs(difference)}`
          }
        </p>
      </div>

    
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg text-white mb-3">Income Sources</h2>
        
        {Object.keys(incomeSources).map((cat) => (
          <div key={cat} className="flex justify-between text-white mb-2">
            <span>{cat}</span>
            <span className="font-semibold">₹{incomeSources[cat]}</span>
          </div>
        ))}
      </div>

     

      
<div className="glass p-6 rounded-2xl">

  
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-lg text-white">Recent Income</h2>

    <a
      href="/income"
      className="text-sm text-blue-300 hover:text-blue-200 underline"
    >
      View All
    </a>
  </div>


  <TransactionList transactions={incomes} />
</div>


    </div>
  );
}
