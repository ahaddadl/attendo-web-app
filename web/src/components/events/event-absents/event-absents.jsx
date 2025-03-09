function EventAbsents({ className= '', attendance }) {
  const absentCount = attendance.filter((participant) => !participant.checkInTime).length;
  const percentage = attendance.length > 0
    ? ((absentCount / attendance.length) * 100).toFixed(2)
    : 0;
  return (
    <div className={`container text-center ${className}`}>
      <div className="row justify-content-md-center">
        <div className="col-md-auto border border-tertiary">
          <h3>{absentCount}</h3>
          <h6>{percentage}% Absents</h6>
        </div>
      </div>
    </div>
  );
}

export default EventAbsents;
