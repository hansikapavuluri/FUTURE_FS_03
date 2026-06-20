import dotenv from "dotenv";
dotenv.config();


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import admissionsRoute from "./routes/admissions.js";
import authRoute from "./routes/auth.js";
import contactRoute from "./routes/contact.js"; // ✅ new contact route

const app = express();

// ✅ Enable CORS for all CRUD methods
app.use(cors({
  origin: "http://localhost:5173",   // allow your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/schoolDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Auth route (login)
app.use("/api/auth", authRoute);

// Admissions route (public now)
app.use("/api/admissions", admissionsRoute);

// Contact route (sends email)
app.use("/api/contact", contactRoute);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
