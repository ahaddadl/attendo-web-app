function EventAbsents({ attendance }) {
  const absentCount = attendance.filter(
    (participant) => !participant.checkInTime
  ).length;
  const percentage =
    attendance.length > 0
      ? ((absentCount / attendance.length) * 100).toFixed(2)
      : 0;
  return (
    <div className="card text-center mb-3 shadow">
      <div className="card-body">
        <h2 className="card-title">{absentCount}</h2>
        <h6 className="card-subtitle text-muted">{percentage}% Absents</h6>
      </div>
    </div>
  );
}

export default EventAbsents;

{
  /* <div className="card text-center mb-3 shadow">
<div className="card-body">
  <h2 className="card-title">{attendance.length}</h2>
  <h6 className="card-subtitle text-muted">Expected Attendance</h6>
</div>
</div> */
}

{
  /* <div className={`container text-center ${className}`}>
<div className="row justify-content-md-center">
  <div className="col-md-auto border border-tertiary shadow-sm p-3 mb-2 bg-body rounded">
    <h2>{absentCount}</h2>
    <h6>{percentage}% Absents</h6>
  </div>
</div>
</div> */
}
