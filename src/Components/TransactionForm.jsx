import React, { useState } from "react";

function TransactionForm({ addTransaction }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      text,
      amount: parseFloat(amount),
      category: category || "General",
      created_at: new Date().toISOString(),
    });

    setText("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
      
      {/* Description */}
      <input
        type="text"
        placeholder="Description"
        className="w-full p-3 rounded-xl 
                   bg-transparent text-white 
                   placeholder-gray-400
                   border border-white/30 
                   focus:border-white focus:outline-none 
                   transition"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-3 rounded-xl 
                   bg-transparent text-white 
                   placeholder-gray-400
                   border border-white/30 
                   focus:border-white focus:outline-none 
                   transition"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Category */}
      <input
        type="text"
        placeholder="Category (optional)"
        className="w-full p-3 rounded-xl 
                   bg-transparent text-white 
                   placeholder-gray-400
                   border border-white/30 
                   focus:border-white focus:outline-none 
                   transition"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Button */}
      <button
        className="w-[30%]  rounded-lg
                   bg-gradient-to-br from-green-400 to-green-600
                   text-white font-semibold
                   hover:opacity-90 transition"
      >
        Add 
      </button>

    </form>
  );
}

export default TransactionForm;
