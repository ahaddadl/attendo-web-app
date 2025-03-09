import PageLayout from "../../layouts/page-layout/page-layouts";
import EventRow from "../event-row/event-row";

function EventTable({ attendance, event}) {
  if (!event) {
    return (
      <PageLayout>
        <p>Loading event details...</p>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <h3>Event: {event.title}</h3>
      <h6>City: {event.address.city}</h6>
      <h6>Start Date: {new Date(event.startDate).toLocaleString()}</h6>
      <h6>End Date: {new Date(event.endDate).toLocaleString()}</h6>
      <h6 >Event Id: <span className="text-primary">{event.id}</span></h6>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Participant Id</th>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th scope="col">Status</th>
            <th scope="col">Check-in Time</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <EventRow key={record.id} record={record} />
          ))}
        </tbody>
      </table>
    </PageLayout>
  );
}
export default EventTable;
