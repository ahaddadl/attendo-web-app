import { useState, useEffect } from "react";
import EventItem from "../event-item/event-item";
import * as AttendoApi from "../../../services/api-service";

function EventList({ className = "", events: initialEvents }) {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const handleEventDeletion = (event) => {
    AttendoApi.deleteEvent(event.id)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((ev) => ev.id !== event.id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={`d-flex flex-wrap gap-3 ${className} className="row g-2 p-4 shadow-sm mb-4"    style={{
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      border: "none",
    }}`}
    >
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          onDelete={handleEventDeletion}
        />
      ))}
    </div>
  );
}

export default EventList;
