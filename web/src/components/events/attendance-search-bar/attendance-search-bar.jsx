import React, { useState } from "react";

function AttendanceFilterBar({ onFilter }) {
  const [participantId, setParticipantId] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ participantId, name, company, status });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-2 p-4 shadow-sm"    style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "none",
        }}>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Participant ID"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-secondary">
            Filter
          </button>
        </div>
      </div>
    </form>
  );
}

export default AttendanceFilterBar;
