const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", protect, createExpense);
router.get("/", protect, getExpenses);
router.get("/:id", protect, getExpense);
router.patch("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;