const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "User email already taken",
            errors: { email: "Already exists" },
          })
        );
      } else {
        return User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          avatar: req.file?.path,
        }).then((user) => {
          // sendValidationEmail(user);
          //req.session.userId = user._id

          res.status(201).json(user);
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const permittedBody = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    avatar: req.body.avatar,
  };

  // remove undefined keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  // merge body into req.user object
  Object.assign(req.user, permittedBody);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.validate = (req, res, next) => {
  User.findOne({ _id: req.params.id, activateToken: req.query.token })
    .then((user) => {
      if (user) {
        user.active = true;
        user.save().then((user) => res.json(user));
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

module.exports.list = (req, res, next) => {
  const { limit = 10, page = 0, sort = "name", role, active } = req.query;

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
  if (role) criterial["role"] = role;
  if (active) criterial["active"] = active;

  User.find(criterial)
    .sort({ [sort]: "asc" })
    .limit(limit)
    .skip(limit * page)
    .then((users) => res.json(users))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { email } = req.body;
  User.findOneAndDelete({ email })
    .then((user) => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((error) => next(error));
};
