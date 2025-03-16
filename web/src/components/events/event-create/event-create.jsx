import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../../../services/api-service.js";

function CreateEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Convert categories string into an array if provided
      if (data.categories) {
        data.categories = data.categories.split(",").map((cat) => cat.trim());
      }
      const event = await addEvent(data);
      // Navigate to the new event's detail page
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h2 className="mb-0">Create Event</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>
            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                rows="4"
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description.message}</div>
              )}
            </div>
            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="datetime-local"
                className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                {...register("startDate", { required: "Start date is required" })}
              />
              {errors.startDate && (
                <div className="invalid-feedback">{errors.startDate.message}</div>
              )}
            </div>
            {/* End Date */}
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="datetime-local"
                className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                {...register("endDate", { required: "End date is required" })}
              />
              {errors.endDate && (
                <div className="invalid-feedback">{errors.endDate.message}</div>
              )}
            </div>
            {/* Address - City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                {...register("address.city", { required: "City is required" })}
              />
            </div>
            {/* Address - Street */}
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                {...register("address.street", { required: "Street is required" })}
              />
            </div>
            {/* Categories */}
            <div className="mb-3">
              <label className="form-label">Categories (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                {...register("categories")}
              />
            </div>
            {/* Poster URL */}
            <div className="mb-3">
              <label className="form-label">Poster URL</label>
              <input
                type="url"
                className={`form-control ${errors.poster ? "is-invalid" : ""}`}
                {...register("poster", { required: "Poster URL is required" })}
              />
              {errors.poster && (
                <div className="invalid-feedback">{errors.poster.message}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
