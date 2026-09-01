require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());


app.get ("/", (req, res) => {
    res.send("Expense tracker API in running");
});
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});

app.use("/api/auth", authRoutes)







