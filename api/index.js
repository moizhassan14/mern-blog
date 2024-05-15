import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import chalk from "chalk";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
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
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || "";
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.listen(3000, () => {
  console.log("server is running on 3000!!");
});
