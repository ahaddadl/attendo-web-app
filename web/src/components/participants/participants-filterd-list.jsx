import { useEffect, useState } from "react";
import { listParticipants } from "../../services/api-service";
import ParticipantsEventsTable from "./participants-events-table";

function ParticipantFiltered() {
  const [participants, setParticipants] = useState([]);
  
  useEffect(() => {
    listParticipants({})
      .then((data) => setParticipants(data))
      .catch((error) => console.error(error));
  }, []);
  
  console.log("Participants: ", participants);
  
  return (
    <div>
      <h3>Participants and Their Events</h3>
      <ParticipantsEventsTable participants={participants} />
    </div>
  );
}

export default ParticipantFiltered;

