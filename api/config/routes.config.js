const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");

const auth = require("../middlewares/session.middleware");
const guestMiddleware = require("../middlewares/guest.middleware");

const users = require("../controllers/users.controller");
const guest = require("../controllers/guest.controller");
const sessions = require("../controllers/sessions.controller");
const events = require("../controllers/events.controller");

// User Routes
router.post("/users", users.create);
router.get("/users", users.list);
router.get("/users/me", users.profile);
router.patch("/users/me", users.update);
router.delete("/users/me", users.delete);

// Session Routes
router.post("/sessions", sessions.create);
router.delete("/sessions", sessions.destroy);

// Event Routes
router.post("/events", events.create);
router.get("/events", events.list);

// Guest Routes
router.param("guestId", guestMiddleware.loadGuest);

router.post("/guests", guest.create);
router.get("/guests", guest.list);
router.get("/guests/:guestId", guest.profile);
// router.patch("/guests/:id", guest.update)
// router.delete("/guests/:id", guest.delete)

//Participant Routes
//router.post("/participants", participants.create);
//router.get("/participants", participants.list);
//router.get("/participants/:participantsId", participants.profile);
// router.patch("/participants/:id", participants.update)
// router.delete("/participants/:id", participants.delete)

//Attendance Routes
//router.post("/participants", participants.create);
//router.get("/participants", participants.list);
//router.get("/participants/:participantsId", participants.profile);
// router.patch("/participants/:id", participants.update)
// router.delete("/participants/:id", participants.delete)

//Attendance for a particular evet

router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = createError(404, "Resource not found");
  else if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (!error.status) error = createError(500, error.message);
  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey]?.message || error.errors[errorKey];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
