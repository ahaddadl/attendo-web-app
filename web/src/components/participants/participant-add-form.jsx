import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addParticipant, addAttendance } from "../../services/api-service";

function AddParticipantForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { eventId } = useParams();


  const onSubmit = async (data) => {
    try {
      // Call the API to register the participant.
      const participant = await addParticipant(data);
      
      const attendancePayload = {
        participant: participant.id,
        event: eventId,
        participantModel: "Guest", 
        status: "attended",
        checkInTime: new Date().toISOString(),         
      };

      await addAttendance(attendancePayload);

      // Navigate to a confirmation page or participant list
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Error registering participant:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Participant</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            {...register("companyName")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telephone</label>
          <input
            type="text"
            className="form-control"
            {...register("telephone")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            type="text"
            className="form-control"
            {...register("dni")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">NIE</label>
          <input
            type="text"
            className="form-control"
            {...register("nie")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Passport</label>
          <input
            type="text"
            className="form-control"
            {...register("passport")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Observation</label>
          <textarea className="form-control" {...register("observation")}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default AddParticipantForm;
