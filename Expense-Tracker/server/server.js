require("dotenv").config();
const cors = require("cors");

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = 5000;
connectDB();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"]
}));
app.use(express.json());

app.get ("/", (req, res) => {
    res.send("Expense tracker API in running");
});

app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});









