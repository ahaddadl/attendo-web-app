const Guest = require("../models/guest.model");
const createError = require("http-errors");

module.exports.loadGuest = (req, res, next, guestId) => {
  Guest.findById(guestId)
    .then((guest) => {
      if (!guest) {
        return next(createError(404, "Guest not found"));
      }
      req.guest = guest;
      next();
    })
    .catch((error) => next(error));
};
