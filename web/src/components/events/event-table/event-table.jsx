import PageLayout from "../../layouts/page-layout/page-layouts";
import EventRow from "../event-row/event-row";

function EventTable({ attendance, eventName }) {
  return (
    <PageLayout>
      <h4>Event: {eventName}</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Participant</th>
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
