const Attendance = require("../models/attendance.model");
const createError = require("http-errors");

module.exports.loadAttendance = (req, res, next, attendanceId) => {
  Attendance.findById(attendanceId)
    .then((attendance) => {
      if (!attendance) {
        return next(createError(404, "attendance not found"));
      }
      req.attendance = attendance;
      next();
    })
    .catch((error) => next(error));
};
