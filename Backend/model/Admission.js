import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  grade: String,
  message: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true }); // 👈 important

export default mongoose.model("Admission", admissionSchema);
