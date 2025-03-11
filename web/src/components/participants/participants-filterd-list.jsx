import { useEffect, useState, useMemo } from "react";
import { listParticipants } from "../../services/api-service";
import ParticipantsEventsTable from "./participants-events-table";
import ParticipantEventsSearchBar from "./participants-events-search-bar";

function ParticipantFiltered() {
  const [participants, setParticipants] = useState([]);
  const [filters, setFilters] = useState({});

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    listParticipants({})
      .then((data) => setParticipants(data))
      .catch((error) => console.error(error));
  }, []);

  console.log("Participants: ", participants);

  const noEventsRegex = /^(n|no(?:\s*e(?:v(?:e(?:n(?:ts?)?)?)?)?)?)\s*$/i;;

  // Filter participants on the client side based on the search criteria.
  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      // Check for name and companyName matches.
      const matchesName =
        !filters.name ||
        (participant.name &&
          participant.name.toLowerCase().includes(filters.name.toLowerCase()));
      const matchesCompany =
        !filters.company ||
        (participant.companyName &&
          participant.companyName
            .toLowerCase()
            .includes(filters.company.toLowerCase()));

      // For events, assume that participant.attendedEvents is an array of attendance objects,
      // each with an 'event' property that includes a 'title'.
      const matchesEvent =
        !filters.event ||
        (participant.attendedEvents &&
          participant.attendedEvents.some(
            (att) =>
              att.event &&
              att.event.title &&
              att.event.title
                .toLowerCase()
                .includes(filters.event.toLowerCase())
          ));

          const matchesStatus =
          !filters.status ||
          (
            participant.attendedEvents && participant.attendedEvents.length > 0
              ? participant.attendedEvents.some(
                  (att) =>
                    att.status &&
                    att.status.toLowerCase().includes(filters.status.toLowerCase())
                )
              : noEventsRegex.test(filters.status)
          );

      return matchesName && matchesCompany && matchesEvent && matchesStatus;
    });
  }, [participants, filters]);

  return (
    <div>
      <h3>Participants and Their Events</h3>
      <ParticipantEventsSearchBar onSearch={handleSearch} />
      <ParticipantsEventsTable participants={filteredParticipants} />
    </div>
  );
}

export default ParticipantFiltered;
