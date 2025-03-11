import { useEffect, useState } from "react";
import { participantsProfile } from "../../services/api-service.js";
import { useParams } from "react-router-dom";
import PageLayout from "../layouts/page-layout/page-layouts.jsx";

function ParticipantProfile() {
  const { participantId } = useParams();
  const [participant, setParticipant] = useState({});

  console.log("GuestId", participantId);

  useEffect(() => {
    participantsProfile(participantId)
      .then((data) => setParticipant(data))
      .catch((error) => console.error(error));
  }, [participantId]);

  console.log("Participant", participant);
  return (
    <PageLayout>
      
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="card-title mb-0">{participant.name}</h5>
          <small className="text-muted">ID: {participant.id}</small>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Email:</strong> {participant.email}
            <br />
            <strong>Company:</strong> {participant.companyName || "N/A"}
            <br />
            <strong>Telephone:</strong> {participant.telephone || "N/A"}
          </p>
        </div>
        {participant.attendedEvents &&
          participant.attendedEvents.length > 0 && (
            <>
              <div className="card-header">
                <h6 className="mb-0">Attended Events</h6>
              </div>
              <ul className="list-group list-group-flush">
                {participant.attendedEvents.map((attendance) => (
                  <li className="list-group-item" key={attendance.id}>
                    <div>
                      <strong>Event:</strong>{" "}
                      {attendance.event?.title || "Unknown Event"}
                    </div>
                    <div>
                      <strong>Status:</strong> {attendance.status}
                    </div>
                    <div>
                      <strong>Check-In Time:</strong>{" "}
                      {attendance.checkInTime
                        ? new Date(attendance.checkInTime).toLocaleString()
                        : "Not Checked In"}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>
    </PageLayout>
  );
}

export default ParticipantProfile;
