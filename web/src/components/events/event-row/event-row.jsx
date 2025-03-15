import { Link } from "react-router-dom";

function EventRow({ record }) {
  const { participant, status, checkInTime, id } = record;
  const isCheckedIn = Boolean(checkInTime);

  return (
    <tr>
      <td>
        <Link to={`/participants/${participant.id}`}>{participant.id}</Link>
      </td>
      <td>{participant.name}</td>
      <td>{participant.companyName}</td>
      <td className="text-center">
        {isCheckedIn ? (
          <span
            className="bg-success bg-opacity-75 text-white rounded"
            style={{ padding: "0.2rem 0.4rem", fontSize: "0.9rem", lineHeight: 1 }}
          >
            {status}
          </span>
        ) : (
          status
        )}
      </td>
      <td>{checkInTime ? new Date(checkInTime).toLocaleString() : "N/A"}</td>
      <td>
        <Link to={`/attendances/${id}`}>{id}</Link>
      </td>
    </tr>
  );
}

export default EventRow;
