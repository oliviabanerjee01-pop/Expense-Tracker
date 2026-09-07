function ExpenseCard({ expense, onDelete, onEdit }) {
  const id = expense._id || expense.id;

  const amount = Number(expense.amount || 0);

  return (
    <div className="expense-card">
      <div className="expense-left">
        <div className="category-icon">
          {expense.category === "Food"
            ? "🍔"
            : expense.category === "Transport"
            ? "🚗"
            : expense.category === "Shopping"
            ? "🛍️"
            : expense.category === "Bills"
            ? "📄"
            : expense.category === "Entertainment"
            ? "🎬"
            : expense.category === "Education"
            ? "📚"
            : expense.category === "Health"
            ? "❤️"
            : "💰"}
        </div>

        <div>
          <h3>{expense.title}</h3>

          <p>{expense.category}</p>
        </div>
      </div>

      <div className="expense-right">
        <strong>₹{amount.toLocaleString("en-IN")}</strong>

        <div className="expense-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(expense)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;