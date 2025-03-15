import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { attendanceDetail, attendanceUpdate } from "../../services/api-service";

function AttendanceCard() {
  const { attendanceId } = useParams();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newCheckInTime, setNewCheckInTime] = useState("");

  useEffect(() => {
    if (attendanceId) {
      attendanceDetail(attendanceId)
        .then((data) => {
          setAttendance(data);

          setNewStatus(data.status);
          if (data.checkInTime) {
            setNewCheckInTime(
              dayjs(data.checkInTime).format("YYYY-MM-DDTHH:mm")
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching attendance:", err);
          setError(err.message || "Error fetching attendance");
          setLoading(false);
        });
    }
  }, [attendanceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        status: newStatus,
        checkInTime: newCheckInTime
          ? new Date(newCheckInTime).toISOString()
          : null,
      };
      const updatedAttendance = await attendanceUpdate(
        attendanceId,
        updatedData
      );
      setAttendance(updatedAttendance);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating attendance:", err);
    }
  };

  if (loading) {
    return <div>Loading attendance info...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!attendance) {
    return <div>No attendance data found.</div>;
  }

  const { status, event, participant, participantModel, checkInTime } =
    attendance;

  return (
    <div className="card mb-3">
      <div className="card-header">
        Attendance Information
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
            <h5 className="card-title">Status: {status}</h5>
            <p className="card-text">
              <strong>Event ID:</strong> {event} <br />
              <strong>Participant ID:</strong> {participant} <br />
              <strong>Participant Type:</strong> {participantModel} <br />
              <strong>Check-In Time:</strong>{" "}
              {checkInTime
                ? dayjs(checkInTime).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="registered">Registered</option>
                <option value="confirmed">Confirmed</option>
                <option value="attended">Attended</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Check-In Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={newCheckInTime}
                onChange={(e) => setNewCheckInTime(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AttendanceCard;
