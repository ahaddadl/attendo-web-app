import EventFilterdList from "../components/events/event-filterd-list/event-filterd-list";
// import EventList from "../components/events/event-list/event-list";
import EventsSearchBar from "../components/events/events-search-bar/events-search-bar";
import PageLayout from "../components/layouts/page-layout/page-layouts";

function HomePage() {
  return (
    <PageLayout>
      <h3 className="fw-light mb-4"><span className="text-primary fw-bold">Vocento</span> events</h3>
      <EventFilterdList />
    </PageLayout>
  );
}

export default HomePage;
