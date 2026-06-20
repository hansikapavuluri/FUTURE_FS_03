import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate

function Hero() {
  const navigate = useNavigate();  // ✅ Initialize navigate
  const scrollToAdmissions = () => {
    const admissionsSection = document.getElementById("admissions");
    if (admissionsSection) {
      admissionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Welcome to Our School</h1>
        <p>Empowering students with knowledge, discipline, and values.</p>
        <button className="cta-btn" onClick={scrollToAdmissions}>
          Explore Admissions
        </button>
      </div>
    </section>
  );
}

export default Hero;
