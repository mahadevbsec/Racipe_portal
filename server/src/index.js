import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

// Load .env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ DB connected..."))
.catch((err) => console.error(" DB connection error:", err));

// Start Server
app.listen(3001, () => console.log(" Server started on port 3001"));
