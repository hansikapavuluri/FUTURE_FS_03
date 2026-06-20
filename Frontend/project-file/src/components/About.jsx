

import "../styles/About.css";
// import { useNavigate } from "react-router-dom"; 

function About() {
  
  return (
    <section className="about reveal" id="about">
      <div className="about-container">
        <h2>About Our School</h2>
        <p>
          Our school is dedicated to nurturing young minds with knowledge,
          discipline, and values. We strive to create a learning environment
          that encourages curiosity, creativity, and character development.
        </p>

        <div className="about-values">
          <div className="value-card">
            <h3>Excellence</h3>
            <p>We aim for academic and personal excellence in every student.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We instill honesty, responsibility, and respect in our community.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We embrace modern teaching methods and technology for growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
