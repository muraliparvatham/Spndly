import { useState } from "react";

export default function Expense() {
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [textarea, setTextarea] = useState("");

  const handleInputChange = (e) => setAmount(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTextareaChange = (e) => setTextarea(e.target.value);
  const handleFilterCategoryChange = (e) => setCategoryFilter(e.target.value);

  const handleCredit = () => {
    if (!category) {
      setError("Please select a category");
      return;
    }
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      setTotal(total + value);
      setTransactions([
        ...transactions,
        {
          type: "Credit",
          amount: value,
          category,
          textarea,
          date: new Date().toLocaleString(),
        },
      ]);
      setAmount("");
      setError("");
      setTextarea("");
    } else {
      setError("Enter a valid number");
    }
  };

  const handleDebit = () => {
    if (!category) {
      setError("Please select a category");
      return;
    }
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      setTotal(total - value);
      setTransactions([
        ...transactions,
        {
          type: "Debit",
          amount: value,
          category,
          textarea,
          date: new Date().toLocaleString(),
        },
      ]);
      setAmount("");
      setError("");
      setTextarea("");
    } else {
      setError("Enter a valid number");
    }
  };

  const handleClearAmount = () => {
    setAmount("");
    setCategory("");
    setTotal(0);
    setTransactions([]);
    setError("");
    setCategoryFilter("");
    setShowFilter(false);
    setTextarea("");
  };

  const handleViewStatement = () => setShowFilter(true);

  const filteredTransactions =
    categoryFilter !== ""
      ? transactions.filter(
          (transaction) => transaction.category === categoryFilter
        )
      : transactions;

  const totalCredit = transactions
    .filter((transaction) => transaction.type === "Credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalDebit = transactions
    .filter((transaction) => transaction.type === "Debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-8 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-5xl font-extrabold mb-2 animate-pulse">Spndly</h1>
        <p className="text-2xl font-light">
          Track your credits, debits, and manage your finances efficiently.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <input
          type="number"
          value={amount}
          onChange={handleInputChange}
          placeholder="Amount"
          className="p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Category</option>
          <option value="income">Income</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="housing">Housing</option>
          <option value="transportation">Transportation</option>
          <option value="vehicle">Vehicle</option>
          <option value="entertainment">Entertainment</option>
          <option value="mobile">Mobile & PC</option>
          <option value="investment">Investment</option>
          <option value="other">Others</option>
        </select>
        <textarea
          value={textarea}
          onChange={handleTextareaChange}
          placeholder="Notes (optional)"
          className="p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-between mb-6">
        <button
          onClick={handleCredit}
          className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
        >
          Add Credit
        </button>
        <button
          onClick={handleDebit}
          className="px-8 py-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
        >
          Add Debit
        </button>
        <button
          onClick={handleClearAmount}
          className="px-8 py-4 bg-gray-400 text-white rounded-lg shadow-lg hover:bg-gray-500 transition duration-300"
        >
          Clear All
        </button>
        <button
          onClick={handleViewStatement}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          View Statement
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {showFilter && (
        <div className="mb-6">
          <select
            value={categoryFilter}
            onChange={handleFilterCategoryChange}
            className="p-4 text-lg border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            <option value="income">Income</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="vehicle">Vehicle</option>
            <option value="entertainment">Entertainment</option>
            <option value="mobile">Mobile & PC</option>
            <option value="investment">Investment</option>
            <option value="other">Others</option>
          </select>
        </div>
      )}

      <div className="flex justify-between mb-8">
        <div className="p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Credit</h3>
          <p className="text-2xl">₹{totalCredit.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Debit</h3>
          <p className="text-2xl">₹{totalDebit.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Amount</h3>
          <p className="text-2xl">₹{total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Transaction History
        </h2>
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul>
            {filteredTransactions.map((transaction, index) => (
              <li
                key={index}
                className={`p-4 mb-4 rounded-lg ${
                  transaction.type === "Credit" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="font-semibold">
                  {transaction.type}: ₹{transaction.amount.toFixed(2)}
                </div>
                <div>
                  <span className="italic">{transaction.category}</span> on{" "}
                  <span className="text-gray-500">{transaction.date}</span>
                </div>
                <p className="mt-2 text-gray-700">{transaction.textarea}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
