import { Link } from "react-router-dom";

function EventRow({ record }) {
  const { participant, status, checkInTime, id } = record;
  const isCheckedIn = Boolean(checkInTime);
  return (
    <tr>
      <td> <Link to={`/participants/${participant.id}`}>{participant.id}</Link></td>
      <td>{participant.name}</td>
      <td>{participant.companyName}</td>
      <td className={isCheckedIn ? "bg-success bg-opacity-75 text-white" : ""}>{status}</td>
      <td>{checkInTime ? new Date(checkInTime).toLocaleString() : "N/A"}</td>
      <td><Link to={`/attendances/${id}`}>{id}</Link></td>
    </tr>
  );
}

export default EventRow;

