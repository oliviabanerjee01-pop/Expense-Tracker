const Expense = require("../models/expense")

const createExpense = async (req,res) => {
    try{
        const {amount, category, description, date} = req.body;

        const expense = await Expense.create({
            userId: req.user.userId,
                amount,
                category,
                description,
                date
            });

            res.status(201).json(expense);
        }
        catch (error) {
            res.status(500).json({
                message: error.message
        });

    };
}


const getExpenses = async (req, res) => {
    try {
        const filter = {
            userId: req.user.userId
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const expenses = await Expense.find(filter);

        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json(expense);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateExpense = async (req,res) => {
    try{
        const {amount, category, description, date} = req.body

        const expense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            {
                amount,
                category,
                description,
                date
            },
            {
                new: true,
                runValidators: true
            }

        );

        if(!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });

        }

        res.json(expense);
    } 
    catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense
};

        
    
