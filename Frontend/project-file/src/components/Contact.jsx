import "../styles/Contact.css";
import { useState } from "react";
import emailjs from "emailjs-com"; // ✅ import EmailJS

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // success/error/loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    emailjs.send(
      "service_hxlolxq",   // ✅ Your Service ID
      "template_hsj7ozm",  // ✅ Your Template ID
      {
        title: "Contact Form",              // matches {{title}}
        name: formData.name,                // matches {{name}}
        from_name: formData.name,           // matches {{from_name}}
        from_email: formData.email,         // matches {{from_email}}
        time: new Date().toLocaleString(),  // matches {{time}}
        from_message: formData.message,     // matches {{from_message}}
      },
      "lplIrKhlkGmy_knhy"  // ✅ Your Public Key
    ).then(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // reset form
      setTimeout(() => setStatus(""), 4000);
    }).catch((err) => {
      console.error("EmailJS error:", err); // log actual error
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    });
  };

  return (
    <section className="contact reveal" id="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>

        {status === "success" && <div className="success-box">✅ Message sent successfully!</div>}
        {status === "error" && <div className="error-box">❌ Something went wrong. Try again.</div>}
        {status === "loading" && <div className="loading-box">⏳ Sending...</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            value={formData.message}
            placeholder="Enter Message"
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
