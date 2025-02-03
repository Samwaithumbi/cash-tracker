import React from "react";

const Balance = ({ storedIncome, storedExpense }) => {
 const income = isNaN(storedIncome) ? 0 : parseFloat(storedIncome);
 const expense = isNaN(storedExpense) ? 0 : parseFloat(storedExpense);
 const balance = income - expense;

  return (
    <div className="balance-container">
      <div className="b-container">
        <div>
          <h2>Total Balance</h2>
          <h1>{balance.toFixed(2)}</h1>
        </div>
        <div className="income-expense">
          <div className="income">
            <h3>Income</h3>
            <h2>{income.toFixed(2)}</h2>
          </div>
          <div className="expense">
            <h3>Expenses</h3>
            <h2>{expense.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
