import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getEvent, updateEvent } from "../services/api-service.js";
import PageLayout from "../components/layouts/page-layout/page-layouts";
import EventTable from "../components/events/event-table/event-table";
import ExpectedAttendance from "../components/events/expected-attendance/expected-attendance.jsx";
import EventAbsents from "../components/events/event-absents/event-absents.jsx";
import AttendanceFilterBar from "../components/events/attendance-search-bar/attendance-search-bar.jsx";
import ParticipantAddButton from "../components/participants/participant-add-button.jsx";

function EventAttendance() {
  const { eventId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [event, setEvent] = useState(null);
  const [filters, setFilters] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getEvent(eventId)
      .then((data) => {
        console.log("Event attendance:", data);
        setAttendance(data.attendances);
        setEvent(data);
        // Pre-populate editData with event details, converting dates for datetime-local
        setEditData({
          title: data.title,
          startDate: dayjs(data.startDate).format("YYYY-MM-DDTHH:mm"),
          endDate: dayjs(data.endDate).format("YYYY-MM-DDTHH:mm"),
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [eventId]);
  


  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const { participant, status } = record;
      const matchesName =
        !filters.name ||
        (participant &&
          participant.name &&
          participant.name.toLowerCase().includes(filters.name.toLowerCase()));
      const matchesCompany =
        !filters.company ||
        (participant &&
          participant.companyName &&
          participant.companyName
            .toLowerCase()
            .includes(filters.company.toLowerCase()));
      const matchesEvent =
        !filters.event ||
        (record.event &&
          record.event.title &&
          record.event.title
            .toLowerCase()
            .includes(filters.event.toLowerCase()));
      const matchesStatus =
        !filters.status ||
        (status && status.toLowerCase().includes(filters.status.toLowerCase()));

      return matchesName && matchesCompany && matchesEvent && matchesStatus;
    });
  }, [attendance, filters]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!event) {
    return (
      <PageLayout>
        <p>Loading event details...</p>
      </PageLayout>
    );
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = await updateEvent(eventId, editData);
      setEvent(updatedEvent);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <PageLayout>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            Event: <span className="text-primary">{event.title}</span>
          </h5>
          {!editMode && (
            <button
              className="btn btn-secondary"
              onClick={() => setEditMode(true)}
            >
              Edit Event
            </button>
          )}
        </div>
      </div>
      {event && !editMode ? (
        <div className="mb-4">
          <h6>City: {event.address.city}</h6>
          <h6>
            Start Date: {dayjs(event.startDate).format("MMM D, YYYY h:mm A")}
          </h6>
          <h6>End Date: {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}</h6>

        </div>
      ) : (
        event &&
        editMode && (
          <form onSubmit={handleEditSubmit} className="mb-4">
            <div className="mb-3">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="startDate"
                value={editData.startDate}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="endDate"
                value={editData.endDate}
                onChange={handleEditChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        )
      )}
      <hr className="my-4" />
      <div className="d-flex justify-content-center align-items-center mt-4 gap-4">
        <ExpectedAttendance attendance={attendance} />
        <EventAbsents attendance={attendance} className={"mb-5"} />
        <ParticipantAddButton eventId={eventId} /> 
      </div>
      <AttendanceFilterBar onFilter={setFilters} />

      <EventTable attendance={filteredAttendance} event={event} />
    </PageLayout>
  );
}

export default EventAttendance;
