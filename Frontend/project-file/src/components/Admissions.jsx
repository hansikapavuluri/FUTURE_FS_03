import "../styles/Admissions.css";
import { useState } from "react";

function Admissions() {

  const [formData, setFormData] = useState({ name: "", email: "", grade: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // ✅ get token from login

      const res = await fetch("http://localhost:5000/api/admissions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" // ✅ send Bearer format
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("✅ Your admission form has been submitted successfully!");
        setFormData({ name: "", email: "", grade: "", message: "" }); // reset form
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setSuccessMessage("❌ Something went wrong. Please try again.");
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      setSuccessMessage("❌ Server error. Please try again later.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <section className="admissions reveal" >
      <div className="admissions-container" id="admissions">
        <h2>Admissions Form</h2>
        {successMessage && <div className="success-box">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" type="text" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />

          <label>Grade Applying For</label>
          <select name="grade" value={formData.grade} onChange={handleChange} required>
            <option value="">Select Grade</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
          </select>

          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange}></textarea>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Admissions;
