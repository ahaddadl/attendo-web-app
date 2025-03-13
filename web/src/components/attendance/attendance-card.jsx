import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { attendanceDetail } from "../../services/api-service";

function AttendanceCard() {
  // Extract attendanceId from the URL, e.g., /attendances/:attendanceId
  const { attendanceId } = useParams();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("attendaceId: ", attendanceId);

  useEffect(() => {
    if (attendanceId) {
      attendanceDetail(attendanceId)
        .then((data) => {
          setAttendance(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching attendance:", err);
          setError(err.message || "Error fetching attendance");
          setLoading(false);
        });
    }
  }, [attendanceId]);

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
  console.log("attendance: ", attendance);
  
  return (
    <div className="card mb-3">
      <div className="card-header">Attendance Information</div>
      <div className="card-body">
        <h5 className="card-title">Status: {status}</h5>
        <p className="card-text">
          <strong>Event ID:</strong> {event} <br />
          <strong>Participant ID:</strong> {participant} <br />
          <strong>Participant Type:</strong> {participantModel} <br />
          <strong>Status:</strong> {status} <br />
          <strong>Check-In Time:</strong>{" "}
          {checkInTime
            ? dayjs(checkInTime).format("MMM D, YYYY h:mm A")
            : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default AttendanceCard;
