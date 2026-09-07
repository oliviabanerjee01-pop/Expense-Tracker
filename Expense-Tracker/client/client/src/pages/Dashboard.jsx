import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ExpenseCard from "../components/ExpenseCard";
import api from "../services/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");

      const data =
        response.data.expenses ||
        response.data.data ||
        response.data;

      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const categories = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categories[category] =
      (categories[category] || 0) +
      Number(expense.amount || 0);
  });

  const highestCategory = Object.entries(categories).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const average =
    expenses.length > 0 ? total / expenses.length : 0;

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="app">
      <Navbar />

      <main className="page-container">
        <section className="dashboard-header">
          <div>
            <p className="eyebrow">OVERVIEW</p>

            <h1>Dashboard</h1>

            <p>
              Here's what's happening with your expenses.
            </p>
          </div>

          <Link to="/expenses" className="primary-btn">
            + Add Expense
          </Link>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">₹</div>

            <div>
              <p>Total Spending</p>

              <h2>
                ₹{total.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">#</div>

            <div>
              <p>Total Expenses</p>

              <h2>{expenses.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⌁</div>

            <div>
              <p>Average Expense</p>

              <h2>
                ₹{average.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">★</div>

            <div>
              <p>Top Category</p>

              <h2>
                {highestCategory
                  ? highestCategory[0]
                  : "None"}
              </h2>
            </div>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="recent-panel">
            <div className="section-heading">
              <div>
                <h2>Recent Expenses</h2>
                <span>Your latest transactions</span>
              </div>

              <Link to="/expenses" className="view-link">
                View all →
              </Link>
            </div>

            {loading ? (
              <div className="empty-state">
                <div className="spinner"></div>
                <p>Loading...</p>
              </div>
            ) : recentExpenses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">₹</div>

                <h3>No expenses yet</h3>

                <p>
                  Add an expense to start tracking your spending.
                </p>
              </div>
            ) : (
              <div className="expense-list">
                {recentExpenses.map((expense) => (
                  <ExpenseCard
                    key={expense._id || expense.id}
                    expense={expense}
                    onDelete={async (id) => {
                      try {
                        await api.delete(`/expenses/${id}`);

                        setExpenses((prev) =>
                          prev.filter(
                            (item) =>
                              (item._id || item.id) !== id
                          )
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    onEdit={() => {}}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="category-panel">
            <div className="section-heading">
              <div>
                <h2>Categories</h2>
                <span>Where your money goes</span>
              </div>
            </div>

            {Object.keys(categories).length === 0 ? (
              <div className="empty-category">
                No category data yet.
              </div>
            ) : (
              <div className="category-list">
                {Object.entries(categories)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => {
                    const percentage =
                      total > 0
                        ? (amount / total) * 100
                        : 0;

                    return (
                      <div
                        className="category-item"
                        key={category}
                      >
                        <div className="category-row">
                          <span>{category}</span>

                          <strong>
                            ₹{amount.toLocaleString("en-IN")}
                          </strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${percentage}%`,
                            }}
                          ></div>
                        </div>

                        <small>
                          {percentage.toFixed(1)}%
                        </small>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;