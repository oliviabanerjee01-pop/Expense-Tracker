const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
    type: String,
        required: true,
        enum: [
            "Food",
            "Transport",
            "Shopping",
            "Bills",
            "Entertainment",
            "Education",
            "Other"
        ]    
    },

    description: {
        type: String,
        required: false,
        trim: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports=Expense;