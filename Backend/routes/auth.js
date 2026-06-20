import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret"; // ✅ use .env

// Hardcoded admin (hash for "admin123")
const adminUser = {
  email: "admin@school.com",
  password: "$2b$10$Fl0vwCVsSgiOOKlF1OVqwe8tlItjJCTbUx/YFrbqkwdkh2b.R09dO"
};

// LOGIN route
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  if (email !== adminUser.email || !bcrypt.compareSync(password, adminUser.password)) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // ✅ Generate JWT
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ success: true, token });
});

// VERIFY route
router.post("/verify", (req, res) => {
  let token = req.headers["authorization"];
  if (!token) return res.json({ success: false });

  if (token.startsWith("Bearer ")) token = token.slice(7);

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

// Middleware to protect backend routes
export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ success: false, message: "No token provided" });

  if (token.startsWith("Bearer ")) token = token.slice(7);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

export default router;
