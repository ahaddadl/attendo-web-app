function EventRow({ record }) {
  const { participant, status, checkInTime } = record;

  return (
    <tr>
      <td>{participant.name}</td>
      <td>{participant.companyName}</td>
      <td>{status}</td>
      <td>{checkInTime ? new Date(checkInTime).toLocaleString() : "N/A"}</td>
    </tr>
  );
}

export default EventRow;
