import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import chalk from "chalk";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

// Database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() =>
    console.log(
      chalk.blue.bgGreen.bold("Connected to MongoDB successfully !!!")
    )
  )
  .catch((err) => console.log(err));

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configure CORS properly
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// Error handling middleware - moved before static file serving
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
  import('path').then((path) => {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
  }).catch(err => {
    console.error('Error serving static files:', err);
  });
}

// Server running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!`);
});