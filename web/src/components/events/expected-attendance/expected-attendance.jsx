function ExpectedAttendance({ attendance }) {
  return (
    <div className="card text-center mb-3 shadow">
      <div className="card-body">
        <h2 className="card-title">{attendance.length}</h2>
        <h6 className="card-subtitle text-muted">Expected Attendance</h6>
      </div>
    </div>
  );
}

export default ExpectedAttendance;

{
  /* <div className="card text-center mb-3 shadow-sm">
<div className="card-body">
  <h2 className="card-title">{attendance.length}</h2>
  <h6 className="card-subtitle text-muted">Expected Attendance</h6>
</div>
</div> */
}

{
  /* <div className="container text-center ">
<div className="row justify-content-md-center">
  <div className="col-md-auto border border-tertiary shadow-sm p-3 mb-2 bg-body rounded"> 
    <h2>{attendance.length}</h2>
    <h6>Expected Attendance</h6>
  </div>
</div>
</div> */
}
