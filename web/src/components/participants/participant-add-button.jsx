import React from "react";
import { Link } from "react-router-dom";

function AddParticipantButton({eventId}) {
  return (
    <Link to={`/events/${eventId}/add-participant`} style={{ textDecoration: 'none' }}>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "green",
          borderRadius: "8px",
          color: "white",
          fontSize: "35px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        +
      </div>
    </Link>
  );
}

export default AddParticipantButton;



