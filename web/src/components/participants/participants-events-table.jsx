import React from "react";

function ParticipantsEventsTable({ participants }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Participant ID</th>
          <th>Name</th>
          <th>Company Name</th>
          <th>Events &amp; Status</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant) => (
          <tr key={participant.id}>
            <td>{participant.id}</td>
            <td>{participant.name}</td>
            <td>{participant.companyName}</td>
            <td>
              {participant.attendedEvents && participant.attendedEvents.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {participant.attendedEvents.map((attEvent) => (
                    <li key={attEvent.id}>
                      {attEvent.event?.title || "Unknown Event"} - {attEvent.status}
                    </li>
                  ))}
                </ul>
              ) : (
                "No events"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ParticipantsEventsTable;

