import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import chalk from "chalk";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from 'cors';
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
//server running
app.listen(3000, () => {
  console.log("server is running on 3000!!");
});
