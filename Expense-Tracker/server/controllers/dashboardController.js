const Expense = require("../models/expense");
const getDashboard = async (req,res) => {


    try{
        const result = await Expense.aggregate([ 
            {
                $match: {
                    userId: req.user.userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalSpending: {
                        $sum: "$amount"
                    },
                    expenseCount: {
                        $sum: 1
                    }
                }
            }
        ]);

        const totalSpending = result.length > 0
        ? result [0].totalSpending:0;

        const expenseCount = summary.length > 0
            ? summary[0].expenseCount
            : 0;

        // 2. Spending by category
        const categorySpending = await Expense.aggregate([
            {
                $match: {
                    userId: req.user.userId
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    total: -1
                }
            }
        ]);


        
        const monthlySpending = await Expense.aggregate([
            {
                $match: {
                    userId: req.user.userId
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);


        
        const recentExpenses = await Expense.find({
            userId: req.user.userId
        })
            .sort({ date: -1 })
            .limit(5);

    

        res.json({
            totalSpending,
             expenseCount,
            categorySpending,
            monthlySpending,
            recentExpenses
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashboard
};