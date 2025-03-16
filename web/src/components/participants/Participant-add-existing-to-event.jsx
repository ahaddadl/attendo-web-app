import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listParticipants, addAttendance } from "../../services/api-service";

function AddExistingParticipantToEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Search criteria state
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    company: "",
    email: "",
  });
  // Fetched participants based on search criteria
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle search input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({ ...prev, [name]: value }));
  };

  // Search participants when the form is submitted
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Fetch all participants (or use query parameters if supported)
      const data = await listParticipants({});
      // Filter results on client side:
      const filtered = data.filter((p) => {
        const matchesName =
          !searchQuery.name ||
          (p.name &&
            p.name.toLowerCase().includes(searchQuery.name.toLowerCase()));
        const matchesCompany =
          !searchQuery.company ||
          (p.companyName &&
            p.companyName.toLowerCase().includes(searchQuery.company.toLowerCase()));
        const matchesEmail =
          !searchQuery.email ||
          (p.email && p.email.toLowerCase().includes(searchQuery.email.toLowerCase()));
        return matchesName && matchesCompany && matchesEmail;
      });
      setParticipants(filtered);
    } catch (err) {
      console.error(err);
      setError("Error fetching participants.");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a participant to the event
  const handleAddToEvent = async (participantId) => {
    try {
      const attendancePayload = {
        participant: participantId,
        event: eventId,
        participantModel: "Guest",
        status: "attended", // adjust as needed
        checkInTime: new Date().toISOString(),
      };
      await addAttendance(attendancePayload);
      // Navigate back to event page (or show a success message)
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error("Error adding participant to event", err);
      setError("Error adding participant to event.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Add Existing Participant to Event</h4>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Search by Name"
              value={searchQuery.name}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="company"
              placeholder="Search by Company"
              value={searchQuery.company}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Search by Email"
              value={searchQuery.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      {loading && <p>Loading participants...</p>}
      {error && <p className="text-danger">{error}</p>}
      {participants.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>{p.companyName || "N/A"}</td>
                <td>{p.email}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAddToEvent(p.id)}
                  >
                    Add to Event
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No participants found.</p>
      )}
    </div>
  );
}

export default AddExistingParticipantToEvent;
