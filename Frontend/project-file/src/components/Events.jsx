import React from "react";
import "../styles/Events.css";

function Events() {
  const events = [
    { title: "Annual Day", date: "2026-07-15", description: "Cultural programs and awards." },
    { title: "Science Exhibition", date: "2026-08-10", description: "Students showcase projects." },
    { title: "Sports Meet", date: "2026-09-05", description: "Track and field competitions." },
  ];

  return (
    <section className="events">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Events;
