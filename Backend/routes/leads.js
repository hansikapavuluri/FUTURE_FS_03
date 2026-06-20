import express from "express";
import Lead from "../models/Lead.js"; // MongoDB model

const router = express.Router();

// POST /api/leads
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newLead = new Lead({ name, email, message });
    await newLead.save();

    res.json({ success: true, message: "Lead submitted successfully!" });
  } catch (error) {
    console.error("❌ Lead error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
