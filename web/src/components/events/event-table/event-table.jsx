import PageLayout from "../../layouts/page-layout/page-layouts";
import EventRow from "../event-row/event-row";

function EventTable({ attendance, event }) {
  if (!event) {
    return (
      <PageLayout>
        <p>Loading event details...</p>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <h6>
        Event Id: <span className="text-success">{event.id}</span>
      </h6>
      <div
        className="p-3 shadow"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "none",
          marginTop: "1rem",
        }}
      >
        <div className="table-responsive">
          <table className="table mt-4 ">
            <thead>
              <tr>
                <th scope="col">Participant Id</th>
                <th scope="col">Name</th>
                <th scope="col">Company</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col">Check-in Time</th>
                <th scope="col">Attendance Id</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <EventRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
export default EventTable;
