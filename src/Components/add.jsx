import React, { useState, useEffect } from "react";
import Balance from "./balance";
import Transactions from "./transactions";

const Add = () => {
  const [tempIncomeValue, setTempIncomeValue] = useState("0");
  const [tempExpenseValue, setTempExpenseValue] = useState("0");
  const [storedIncome, setStoredIncome] = useState(0);
  const [storedExpense, setStoredExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState(""); // Income category state
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState(""); // Expense category state

  useEffect(() => {
    const income = parseFloat(localStorage.getItem("income")) || 0;
    setStoredIncome(income);

    const expense = parseFloat(localStorage.getItem("expense")) || 0;
    setStoredExpense(expense);

    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions].slice(0, 5); // Limit to the last 5 transactions
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleAddIncome = () => {
    if (!selectedIncomeCategory || selectedIncomeCategory === "Category") {
      alert("Please select a valid category for the income.");
      return;
    }

    const parsedIncome = parseFloat(tempIncomeValue) || 0;
    const newIncomeValue = storedIncome + parsedIncome;

    setStoredIncome(newIncomeValue);
    localStorage.setItem("income", newIncomeValue.toString());
    setTempIncomeValue("0");

    addTransaction({
      type: "income",
      amount: parsedIncome,
      category: selectedIncomeCategory,
    });
  };

  const handleAddExpense = () => {
    if (!selectedExpenseCategory || selectedExpenseCategory === "Category") {
      alert("Please select a valid category for the expense.");
      return;
    }

    const parsedExpense = parseFloat(tempExpenseValue) || 0;
    const newExpenseValue = storedExpense + parsedExpense;

    setStoredExpense(newExpenseValue);
    localStorage.setItem("expense", newExpenseValue.toString());
    setTempExpenseValue("0");

    addTransaction({
      type: "expense",
      amount: parsedExpense,
      category: selectedExpenseCategory,
    });
  };

  const handleRefresh = () => {
    localStorage.setItem("income", "0");
    localStorage.setItem("expense", "0");
    localStorage.setItem("transactions", JSON.stringify([]));

    setStoredIncome(0);
    setStoredExpense(0);
    setTransactions([]);

    alert("Income, expense, and transactions have been reset!");
  };

  return (
    <div className="add">
      <button onClick={handleRefresh} className="refresh-btn">
        Refresh
      </button>
      <Balance storedIncome={storedIncome} storedExpense={storedExpense} />
      <Transactions transactions={transactions} />
      <div className="title">
        <h2 id="transaction">Add Transaction</h2>
      </div>
      <div className="incom">
        <h3>Income</h3>
        <select
          name="incomeCategory"
          id="incomeCategory"
          required
          value={selectedIncomeCategory}
          onChange={(e) => setSelectedIncomeCategory(e.target.value)}
        >
          <option value="Category">Category</option>
          <option value="Salary">Salary</option>
          <option value="Investments">Investments</option>
          <option value="Allowance">Allowance</option>
          <option value="Bonus">Bonus</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          value={tempIncomeValue}
          onChange={(e) => setTempIncomeValue(e.target.value)}
        />
        <button className="btn-save" onClick={handleAddIncome}>
          Save
        </button>
      </div>
      <div className="expens">
        <h3>Expense</h3>
        <select
          name="expenseCategory"
          id="expenseCategory"
          required
          value={selectedExpenseCategory}
          onChange={(e) => setSelectedExpenseCategory(e.target.value)}
        >
          <option value="Category">Category</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Housing">Housing</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
        </select>
        <input
          type="number"
          value={tempExpenseValue}
          onChange={(e) => setTempExpenseValue(e.target.value)}
          className="inputIncome"
        />
        <button onClick={handleAddExpense} className="btn-save">
          Save
        </button>
      </div>
    </div>
  );
};

export default Add;
