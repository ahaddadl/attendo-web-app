const createError = require("http-errors");
const Attendance = require("../models/attendance.model");
const crypto = require("crypto");
const QRCode = require("qrcode");

module.exports.create = async (req, res, next) => {
  try {
    const { participant, event } = req.body;

    const existingAttendance = await Attendance.findOne({ participant, event });
    if (existingAttendance) {
      return next(
        createError(400, {
          message: "Participant already checked in for this event",
          errors: { participant: "Already exists for this event" },
        })
      );
    }

    // Generate a unique token
    const token = crypto.randomBytes(16).toString("hex");

    // Create the attendance record with the token
    const newAttendance = await Attendance.create({
      event: req.body.event,
      participant: req.body.participant,
      checkInTime: req.body.checkInTime, // Optional: can be null initially
      participantModel: req.body.participantModel,
      status: req.body.status,
      checkInToken: token,
    });

    // Generate a QR code that encodes the confirmation URL containing the token
    const confirmUrl = `http://localhost:3000/api/v1/attendances/confirm?token=${token}`;
    const qrCodeDataUrl = await QRCode.toDataURL(confirmUrl);

    res.status(201).json({ attendance: newAttendance, qrCode: qrCodeDataUrl });
  } catch (error) {
    next(error);
  }
};

module.exports.update = (req, res, next) => {
  const permittedBody = {
    status: req.body.status,
    checkInTime: req.body.checkInTime,
  };

  // remove undefined keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  // merge body into req.user object
  Object.assign(req.attendance, permittedBody);

  req.attendance
    .save()
    .then((attendance) => res.json(attendance))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const { limit = 10, page = 0, sort = "name", companyName } = req.query;

  if (Number.isNaN(Number(limit)) || Number(limit) <= 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { limit: "Must be >= 0" },
      })
    );
  }
  if (Number.isNaN(Number(page)) || Number(page) < 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { page: "Must be >= 0" },
      })
    );
  }

  const criterial = {};
  if (companyName) criterial["companyName"] = companyName;

  Attendance.find(criterial)
    .sort({ [sort]: "asc" })
    .limit(limit)
    .skip(limit * page)
    .then((atttendances) => res.json(atttendances))
    .catch((error) => next(error));
};

module.exports.confirm = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return next(createError(400, "Token is required"));
    }

    // Find the attendance record by its checkInToken
    const attendanceRecord = await Attendance.findOne({ checkInToken: token });
    if (!attendanceRecord) {
      return next(createError(404, "Attendance record not found"));
    }

    // Update attendance status and checkInTime (if not already set)
    attendanceRecord.status = "attended";
    if (!attendanceRecord.checkInTime) {
      attendanceRecord.checkInTime = new Date();
    }
    await attendanceRecord.save();

    res.json({
      message: "Attendance confirmed",
      attendance: attendanceRecord,
    });
  } catch (error) {
    next(error);
  }
};
