import React from "react";
import { Link } from "react-router-dom";

function AddParticipantButton({eventId}) {
  return (
    <Link to={`/events/${eventId}/add-participant`} style={{ textDecoration: 'none' }}>
       <div 
        className="card text-center border-0 shadow mb-2" 
        style={{
          width: "100px",
          backgroundColor: "green",
          borderRadius: "8px"
        }}
      >
        <div 
          className="card-body d-flex align-items-center justify-content-center" 
          style={{ height: "100px" }}
        >
          <span style={{ color: "white", fontSize: "35px", fontWeight: "bold" }}>+</span>
        </div>
      </div>
    </Link>
  );
}

export default AddParticipantButton;



