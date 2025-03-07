import { useState } from "react";
import EventItem from "../event-item/event-item";
import * as AttendoApi from "../../../services/api-service";

function EventList({ className = "", events }) {
//   const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(false);

//   useEffect(() => {
//     AttendoApi.listEvents({ city, limit: max, page })
//       .then((events) => setEvents(events))
//       .catch((error) => console.error(error));
//   }, [city, max, reload, page]);

  const handleEventDeletion = (event) => {
    AttendoApi.deleteEvent(event.id)
      .then(() => setReload(!reload))
      .catch((error) => console.error(error));
  };

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
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
