import { useEffect, useState } from "react";
import EventsSearchBar from "../events-search-bar/events-search-bar";
import EventsList from "../event-list/event-list";
import { listEvents } from "../../../services/api-service.js";

function EventFilterdList() {
  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);

  console.log("Filters", filters);
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    // Make an API call with the current filters
    listEvents(filters)
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
  }, [filters]);

  return (
    <div>
      <EventsSearchBar onSearch={handleSearch} />
      <EventsList events={events} />
    </div>
  );
}

export default EventFilterdList;
