import { useEffect, useState } from "react";

function ExpenseForm({ onAdd, editingExpense, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title || "",
        amount: editingExpense.amount || "",
        category: editingExpense.category || "",
      });
    } else {
      setForm({
        title: "",
        amount: "",
        category: "",
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category) {
      return;
    }

    const expense = {
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
    };

    if (editingExpense) {
      await onUpdate(editingExpense._id || editingExpense.id, expense);
    } else {
      await onAdd(expense);
    }

    setForm({
      title: "",
      amount: "",
      category: "",
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
          <p>
            {editingExpense
              ? "Update the expense details."
              : "Record a new expense."}
          </p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Title</label>

          <input
            type="text"
            name="title"
            placeholder="e.g. Lunch"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            placeholder="₹ 0"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        {editingExpense && (
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button type="submit" className="primary-btn">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;