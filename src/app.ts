import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config(); //to use env

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://root:Kenneth2472005@demo.boqumfn.mongodb.net/?retryWrites=true&w=majority&appName=demo"
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("running");
    });
  });

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Authentication routes
app.use("/auth", authRoutes); ///auth is prefix
app.use(userRoutes);
