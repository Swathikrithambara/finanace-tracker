import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { addTransaction } from "../services/transactionService";

export default function AddIncome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !text || !date) return;

    await addTransaction(user.uid, {
      amount: Math.abs(Number(amount)),
      text,
      category: category || "General",
      created_at: new Date(date),
    });

    navigate("/income");
  };

  return (
    <div className="max-w-xl mx-auto glass p-8 rounded-2xl">
      <h1 className="text-2xl text-white font-bold mb-6">
        Add Income
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Amount */}
        <div>
          <label className="block text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 text-white focus:outline-none focus:border-green-400"
            placeholder="₹ 0.00"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 mb-1">Description</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 text-white focus:outline-none focus:border-green-400"
            placeholder="Salary / Freelance / Bonus"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-300 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 text-white focus:outline-none focus:border-green-400"
            placeholder="General"
          />
        </div>

        {/* Date (Calendar) */}
        <div>
          <label className="block text-gray-300 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 text-white focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-lg bg-[#757519] hover:bg-green-500 text-white font-semibold transition"
        >
          Save Income
        </button>
      </form>
    </div>
  );
}
