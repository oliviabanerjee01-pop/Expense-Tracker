const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


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

const loginUser = async(req,res)=> {
    const {email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPassCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPassCorrect) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    
    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    );

    res.json({
        message: "Login successfull",
        token
    });
};

module.exports = {
    registerUser,
    loginUser
};