import express from "express";
import dotenv from "dotenv";
import connectDB from "./Utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//
import userRoute from "./Routes/userRoute.js";


connectDB();
dotenv.config();
const app = express();

// middleware  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow frontend origin
  credentials: true,             // Allow cookies if needed
  optionSuccessStatus: 200,      // For legacy browser support
};
app.use(cors(corsOptions));
    

//api
app.use("/api/v1/user", userRoute);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});