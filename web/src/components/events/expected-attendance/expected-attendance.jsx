function ExpectedAttendance({ attendance }) {
  return (
    <div className="container text-center">
      <div className="row justify-content-md-center">
        <div className="col-md-auto border border-tertiary">
          <h3>{attendance.length}</h3>
          <h6>Expected Attendance</h6>
        </div>
      </div>
    </div>
  );
}

export default ExpectedAttendance;
