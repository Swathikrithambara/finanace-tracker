import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return <div className="text-gray-300">No transactions</div>;
  }

  return (
    <ul className="space-y-2">
      {transactions.map((t, idx) => (
        <TransactionItem key={idx} t={t} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TransactionList;
