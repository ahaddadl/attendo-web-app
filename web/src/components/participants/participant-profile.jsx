import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../layouts/page-layout/page-layouts.jsx";
import { participantsProfile, updateParticipant } from "../../services/api-service.js";

function ParticipantProfile() {
  const { participantId } = useParams();
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (participantId) {
      participantsProfile(participantId)
        .then((data) => {
          setParticipant(data);
          setFormData({
            name: data.name,
            email: data.email,
            companyName: data.companyName || "",
            telephone: data.telephone || "",
            dni: data.dni || "",
            nie: data.nie || "",
            passport: data.passport || "",
            gender: data.gender || "other",
            observation: data.observation || ""
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching participant:", error);
          setLoading(false);
        });
    }
  }, [participantId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateParticipant(participantId, formData);
      setParticipant(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating participant:", error);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div>Loading participant profile...</div>
      </PageLayout>
    );
  }

  if (!participant) {
    return (
      <PageLayout>
        <div>No participant data found.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="card mb-3">
        <div className="card-header">
          {editMode ? "Edit Participant" : "Participant Profile"}
          <button
            className="btn btn-sm btn-secondary float-end"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="card-body">
          {!editMode ? (
            <>
              <h5 className="card-title mb-0">{participant.name}</h5>
              <small className="text-muted">ID: {participant.id}</small>
              <p className="card-text mt-2">
                <strong>Email:</strong> {participant.email} <br />
                <strong>Company:</strong> {participant.companyName || "N/A"} <br />
                <strong>Telephone:</strong> {participant.telephone || "N/A"}
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className="form-control"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  className="form-control"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DNI</label>
                <input
                  type="text"
                  name="dni"
                  className="form-control"
                  value={formData.dni}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">NIE</label>
                <input
                  type="text"
                  name="nie"
                  className="form-control"
                  value={formData.nie}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Passport</label>
                <input
                  type="text"
                  name="passport"
                  className="form-control"
                  value={formData.passport}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Observation</label>
                <textarea
                  name="observation"
                  className="form-control"
                  value={formData.observation}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default ParticipantProfile;
