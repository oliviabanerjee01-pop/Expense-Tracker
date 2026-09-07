import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseCard from "../components/ExpenseCard";
import api from "../services/api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/expenses");

      const data =
        response.data.expenses ||
        response.data.data ||
        response.data;

      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load expenses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      setError("");

      const response = await api.post("/expenses", expense);

      const newExpense =
        response.data.expense ||
        response.data.data ||
        response.data;

      setExpenses((prev) => [newExpense, ...prev]);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to add expense."
      );
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      setError("");

      const response = await api.put(
        `/expenses/${id}`,
        updatedExpense
      );

      const updated =
        response.data.expense ||
        response.data.data ||
        response.data;

      setExpenses((prev) =>
        prev.map((expense) => {
          const expenseId = expense._id || expense.id;

          return expenseId === id ? updated : expense;
        })
      );

      setEditingExpense(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update expense."
      );
    }
  };

  const deleteExpense = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(`/expenses/${id}`);

      setExpenses((prev) =>
        prev.filter((expense) => {
          const expenseId = expense._id || expense.id;
          return expenseId !== id;
        })
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete expense."
      );
    }
  };

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  return (
    <div className="app">
      <Navbar />

      <main className="page-container">
        <div className="page-heading">
          <div>
            <p className="eyebrow">TRANSACTIONS</p>

            <h1>Your Expenses</h1>

            <p>
              Keep track of every expense in one place.
            </p>
          </div>

          <div className="total-box">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {error && (
          <div className="error-message page-error">
            {error}
          </div>
        )}

        <ExpenseForm
          onAdd={addExpense}
          editingExpense={editingExpense}
          onUpdate={updateExpense}
          onCancel={() => setEditingExpense(null)}
        />

        <section className="expenses-section">
          <div className="section-heading">
            <h2>Recent Expenses</h2>

            <span>{expenses.length} transactions</span>
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="spinner"></div>
              <p>Loading expenses...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">₹</div>

              <h3>No expenses yet</h3>

              <p>
                Add your first expense using the form above.
              </p>
            </div>
          ) : (
            <div className="expense-list">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense._id || expense.id}
                  expense={expense}
                  onDelete={deleteExpense}
                  onEdit={setEditingExpense}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Expenses;