import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ configure transporter (use Gmail or SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // ✅ email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // your inbox
      subject: `New Contact Form Submission from ${name}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export default router;
