import React from "react";
import "../styles/Gallery.css";
import { useNavigate } from "react-router-dom"; 

function Gallery() {
    
  const images = [
    { src: "https://images.pexels.com/photos/36839425/pexels-photo-36839425.jpeg", alt: "Annual Day" },
    { src: "https://navyabharathi.co.in/wp-content/uploads/2024/04/DSC_0011-scaled.jpg", alt: "Science Exhibition" },
    { src: "https://images.pexels.com/photos/31091355/pexels-photo-31091355.jpeg", alt: "Sports Meet" },
    { src: "https://images.pexels.com/photos/35551059/pexels-photo-35551059.jpeg", alt: "Classroom Activity" },
  ];

  return (
    <section className="gallery reveal" id="gallery">
      <h2>School Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="gallery-item" key={index}>
            <img src={img.src} alt={img.alt} />
            <p>{img.alt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
