const createError = require("http-errors");
const Participant = require("../models/participant.model");

module.exports.create = (req, res, next) => {
  const { participant } = req.body;

  Participant.findOne({ participant })
    .then((participant) => {
      if (participant) {
        next(
          createError(400, {
            message: "Participant already taken",
            errors: { participant: "Already exists" },
          })
        );
      } else {
        return Participant.create({
          event: req.body.event,
          participant: req.body.participant,
          participantModel: req.body.participantModel,
          status: req.body.status,
          registeredAt: req.body.registeredAt,
    
        }).then((participant) => {
          // sendValidationEmail(user);
          //req.session.userId = user._id

          res.status(201).json(participant);
        });
      }
    })
    .catch((error) => next(error));
};
