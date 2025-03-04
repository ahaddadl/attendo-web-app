import PageLayout from "../components/layouts/page-layout/page-layouts";
import EventTable from "../components/events/event-table/event-table";
import { useEffect, useState } from "react";
import { getEvent } from "../services/api-service.js";
import { useParams } from "react-router-dom";
import ExpectedAttendance from "../components/events/expected-attendance/expected-attendance.jsx";

function EventAttendance() {
  const { eventId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [eventName, setEventName] = useState();

  useEffect(() => {
    getEvent(eventId)
      .then((event) => {
        console.log("Event attendance: ", event);
        setAttendance(event.attendances);
        setEventName(event.title);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [eventId, eventName]);

  return (
    <PageLayout>
      <ExpectedAttendance  attendance={attendance}/>
      <EventTable attendance={attendance} eventName={eventName} />
    </PageLayout>
  );
}

export default EventAttendance;
