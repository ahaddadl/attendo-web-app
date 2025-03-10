import EventFilterdList from "../components/events/event-filterd-list/event-filterd-list";
// import EventList from "../components/events/event-list/event-list";
import EventsSearchBar from "../components/events/events-search-bar/events-search-bar";
import PageLayout from "../components/layouts/page-layout/page-layouts";

function HomePage() {
  return (
    <PageLayout>
      <h3 className="fw-light">Events</h3>
      <EventFilterdList />
    </PageLayout>
  );
}

export default HomePage;
