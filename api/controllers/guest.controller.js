const createError = require("http-errors");
const Guest = require("../models/guest.model");

module.exports.create = (req, res, next) => {
  const { email } = req.body;

  Guest.findOne({ email })
    .then((guest) => {
      if (guest) {
        next(
          createError(400, {
            message: "Guest email already taken",
            errors: { email: "Already exists" },
          })
        );
      } else {
        return Guest.create({
          email: req.body.email,
          name: req.body.name,
          companyName: req.body.companyName,
          telephone: req.body.telephone,
          dni: req.body.dni,
          nie: req.body.nie,
          passport: req.body.passport,
          gender: req.body.gender,
          observation: req.body.observation,
        }).then((guest) => {
          // sendValidationEmail(user);
          //req.session.userId = user._id

          res.status(201).json(guest);
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const permittedBody = {
    email: req.body.email,
    name: req.body.name,
    companyName: req.body.companyName,
    telephone: req.body.telephone,
    dni: req.body.dni,
    nie: req.body.nie,
    passport: req.body.passport,
    gender: req.body.gender,
    observation: req.body.observation,
  };

  // remove undefined keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  // merge body into req.user object
  Object.assign(req.guest, permittedBody);

  req.guest
    .save()
    .then((guest) => res.json(guest))
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.json(req.guest);
};

module.exports.list = (req, res, next) => {
  const {
    limit = 10,
    page = 0,
    sort = "name",
    companyName,
    telephone,
    dni,
    nie,
    passport,
  } = req.query;

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
  if (telephone) criterial["telephone"] = telephone;
  if (dni) criterial["dni"] = dni;
  if (nie) criterial["nie"] = nie;
  if (passport) criterial["passport"] = passport;

  Guest.find(criterial)
    .sort({ [sort]: "asc" })
    .limit(limit)
    .skip(limit * page)
    .then((guest) => res.json(guest))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { email } = req.body;
  Guest.findOneAndDelete({ email })
    .then((user) => {
      res.status(200).json({ message: "Guest deleted successfully" });
    })
    .catch((error) => next(error));
};
