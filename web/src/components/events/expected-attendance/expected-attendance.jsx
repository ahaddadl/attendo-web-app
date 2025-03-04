function ExpectedAttendance({attendance}) {
  return (
    <div className="form-floating mb-3">
    <h3>{attendance.length}</h3>
     <h6>Expected Attendance</h6>
    </div>
  );
}

export default ExpectedAttendance;
