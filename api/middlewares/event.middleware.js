const Event = require("../models/event.model");
const createError = require("http-errors");

module.exports.loadEvent = (req, res, next, eventId) => {
  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return next(createError(404, "Event not found"));
      }
      req.event = event;
      next();
    })
    .catch((error) => next(error));
};
