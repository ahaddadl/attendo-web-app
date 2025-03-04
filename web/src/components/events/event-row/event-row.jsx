function EventRow({ record }) {
  const { participant, status, checkInTime } = record;
  const isCheckedIn = Boolean(checkInTime);
  return (
    <tr>
      <td>{participant.id}</td>
      <td>{participant.name}</td>
      <td>{participant.companyName}</td>
      <td className={isCheckedIn ? "bg-success bg-opacity-75 text-white" : ""}>{status}</td>
      <td>{checkInTime ? new Date(checkInTime).toLocaleString() : "N/A"}</td>
    </tr>
  );
}

export default EventRow;
