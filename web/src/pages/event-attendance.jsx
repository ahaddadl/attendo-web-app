import PageLayout from "../components/layouts/page-layout/page-layouts";
import EventTable from "../components/events/event-table/event-table";
import { useEffect, useState } from "react";
import { getEvent } from "../services/api-service.js";
import { useParams } from "react-router-dom";
import ExpectedAttendance from "../components/events/expected-attendance/expected-attendance.jsx";
import EventAbsents from "../components/events/event-absents/event-absents.jsx";

function EventAttendance() {
  const { eventId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [event, setEvent] = useState(null);

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

  return (
    <PageLayout>
      <div className="d-flex ">
        <ExpectedAttendance attendance={attendance} />
        <EventAbsents attendance={attendance} />
      </div>
      <EventTable attendance={attendance} event={event} />
    </PageLayout>
  );
}

export default EventAttendance;
