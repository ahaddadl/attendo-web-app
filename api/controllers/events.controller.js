const createError = require("http-errors");
const Event = require("../models/event.model");

module.exports.create = (req, res, next) => {
  const event = req.body;
  Event.create(event)
    .then((event) => res.status(201).json(event))
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const {
    limit = 5,
    page = 0,
    sort = "startDate",
    order,
    city,
    title,
    category,
    date,
  } = req.query;

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

  if (city) criterial["address.city"] = new RegExp(city, "i");
  if (category) criterial["categories"] = {$in: new RegExp(category, "i")};
  if (title) criterial.title = new RegExp(title, "i");

  const baseDate = date ? new Date(date) : new Date();
  if (isNaN(baseDate)) {
    return next(createError(400, "Invalid date format"));
  }

  criterial.startDate = { $gte: baseDate };

  const sortOrder = order && order.toLowerCase() === "desc" ? "desc" : "asc";

  Event.find(criterial)
    .sort({ [sort]: sortOrder })
    .limit(limit)
    .skip(limit * page)
    .populate({
      path: "attendances",
      select: "status checkInTime",
      populate: {
        path: "participant",
        select: "name companyName",
      },
    })
    .then((events) => res.json(events))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  res.json(req.event);
};

module.exports.update = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const updateData = req.body;
    const event = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return next(createError(404, "Event not found"));
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return next(createError(404, "Event not found"));
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};  