import express from "express";
import Admission from "../model/Admission.js";

const router = express.Router();

// GET: fetch all admissions
router.get("/", async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// POST: submit admission form
router.post("/", async (req, res) => {
  try {
    const { name, email, grade, message } = req.body;
    const newAdmission = new Admission({ name, email, grade, message });
    await newAdmission.save();
    res.status(201).json({ success: true, admission: newAdmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE admission
router.delete("/:id", async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Admission deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// APPROVE admission
router.put("/:id/approve", async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    res.json({ success: true, admission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// REJECT admission
// REJECT admission (set back to Pending)
router.put("/:id/reject", async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status: "Pending" },   // 👈 back to Pending
      { new: true }
    );
    res.json({ success: true, admission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;
