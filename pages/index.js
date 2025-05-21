import { useState } from "react";

export default function Trakko() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (title && amount) {
      setExpenses([...expenses, { title, amount: parseFloat(amount) }]);
      setTitle("");
      setAmount("");
    }
  };

  const exportToGoogleSheet = async () => {
    const response = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenses }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-4 space-y-4 border">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="mt-1 p-2 w-full border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Groceries"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 20.00"
          />
        </div>
        <button onClick={addExpense} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Expense
        </button>
        <button onClick={exportToGoogleSheet} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Export to Google Sheet
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 border">
        {expenses.length === 0 && <p className="text-gray-500">No expenses added.</p>}
        {expenses.map((e, i) => (
          <div key={i} className="flex justify-between py-2 border-b">
            <span>{e.title}</span>
            <span>${e.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
