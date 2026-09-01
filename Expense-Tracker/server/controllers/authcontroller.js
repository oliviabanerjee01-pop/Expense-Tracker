const bcrypt = require("bcryptjs");
const User = require("../models/user");

const registerUser = async (req,res) => {
    const{name,email,password}=req.body;

    const existingUser = await User.findOne({email});

    if (existingUser){
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user1 = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User registered successfully",
            user: {
                id: user1._id,
                name: user1.name,
                email: user1.email
            }
    });
};

module.exports = {
    registerUser
};