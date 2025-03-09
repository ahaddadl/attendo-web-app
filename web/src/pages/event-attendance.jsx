import PageLayout from "../components/layouts/page-layout/page-layouts";
import EventTable from "../components/events/event-table/event-table";
import { useEffect, useState, useMemo } from "react";
import { getEvent } from "../services/api-service.js";
import { useParams } from "react-router-dom";
import ExpectedAttendance from "../components/events/expected-attendance/expected-attendance.jsx";
import EventAbsents from "../components/events/event-absents/event-absents.jsx";
import AttendanceFilterBar from "../components/events/attendance-search-bar/attendance-search-bar.jsx";

function EventAttendance() {
  const { eventId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [event, setEvent] = useState(null);
  const [filters, setFilters] = useState({})
  useEffect(() => {
    getEvent(eventId)
      .then((event) => {
        console.log("Event attendance: ", event);
        setAttendance(event.attendances);
        setEvent(event);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [eventId]);

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const { participant, status } = record;
      // Assume participant has properties: id, name, companyName.
      const matchesId =
        !filters.participantId ||
        (participant &&
          participant.id &&
          participant.id.toLowerCase().includes(filters.participantId.toLowerCase()));
      const matchesName =
        !filters.name ||
        (participant &&
          participant.name &&
          participant.name.toLowerCase().includes(filters.name.toLowerCase()));
      const matchesCompany =
        !filters.company ||
        (participant &&
          participant.companyName &&
          participant.companyName.toLowerCase().includes(filters.company.toLowerCase()));
      const matchesStatus =
        !filters.status ||
        (status &&
          status.toLowerCase().includes(filters.status.toLowerCase()));

      return matchesId && matchesName && matchesCompany && matchesStatus;
    });
  }, [attendance, filters]);
  
  return (
    <PageLayout>
      <div className="d-flex mt-4">
        <ExpectedAttendance attendance={attendance} />
        <EventAbsents attendance={attendance} className={'mb-5'}/>
      </div>
      <AttendanceFilterBar onFilter={setFilters}/>
      <EventTable attendance={filteredAttendance} event={event} />
    </PageLayout>
  );
}

export default EventAttendance;
