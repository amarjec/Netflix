import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                message: "User already exists",
                success: false,
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create a new user
        const newUser = await User.create({
            fullName,
            email,
            password : hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            data: newUser, // Optional: Include created user info if needed
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false,
            });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }
        
        // Create and sign JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).cookie("token", token).json({
            message: `Welcome back ${existingUser.fullName}`,
            success: true,

        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
    
}

export const Logout = async (req, res) => {
    try {
        return res.clearCookie("token").json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    } 
}
