const createError = require("http-errors");
const Event = require("../models/event.model");

module.exports.create = (req, res, next) => {
  const event = req.body;
  Event.create(event)
    .then((event) => res.status(201).json(event))
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const { limit = 5, page = 0, sort = "startDate", city, title } = req.query;

  if (Number.isNaN(Number(limit)) || Number(limit) <= 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { limit: "Must be > 0" },
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

  if (city) criterial["address.city"] = city;
  if (title) criterial.title = new RegExp(title, "i");

  Event.find(criterial)
    .sort({ [sort]: "desc" })
    .limit(limit)
    .skip(limit * page)
    .then((events) => res.json(events))
    .catch((error) => next(error));
};
