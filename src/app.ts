import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config(); //to use env
const server = http.createServer(app);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://root:Kenneth2472005@demo.boqumfn.mongodb.net/?retryWrites=true&w=majority&appName=demo"
  )
  .then(() => {
    server.listen(8080, () => {
      console.log("running");
    });
  });

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: false }));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cookieParser());

// Authentication routes
app.use("/auth", authRoutes); ///auth is prefix
app.use(userRoutes);
