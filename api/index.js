import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import chalk from "chalk";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js"
//database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() =>
    console.log(
      chalk.blue.bgGreen.bold("Connected to MongoDB successfully !!!")
    )
  )
  .catch((err) => console.log(err));

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//middleware for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || "";
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/comment",commentRoutes)
//server running
app.listen(3000, () => {
  console.log("server is running on 3000!!");
});

//1 line of code
//2 line of code 
// 3 line of code (mid)
// 4 line of code (mid)
//5th line of code 
//6th line of code 
//7th line of code
//8TH LINE OF CODE
//9th line of code
//10th line of code
//11th line of code
//12 line of code
//eid day 3
// 13th line of code
//sunday
//14th line of code 