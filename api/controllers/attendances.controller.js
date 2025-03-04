const createError = require("http-errors");
const Attendance = require("../models/attendance.model");

module.exports.create = (req, res, next) => {
  const { participant, event } = req.body;

  Attendance.findOne({ participant, event })
    .then((existingAttendance) => {
      if (existingAttendance) {
        next(
          createError(400, {
            message: "Participant already checked in for this event",
            errors: { participant: "Already exists for this event" },
          })
        );
      } else {
        return Attendance.create({
          event: req.body.event,
          participant: req.body.participant,
          checkInTime: req.body.checkInTime,
          participantModel: req.body.participantModel,
          status: req.body.status,
        }).then((participant) => {
          // sendValidationEmail(user);
          //req.session.userId = user._id

          res.status(201).json(participant);
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const permittedBody = {
    status: req.body.status,
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
