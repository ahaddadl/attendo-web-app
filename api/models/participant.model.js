const dayjs = require("dayjs");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //refPath: "participantModel",
      ref: "Guest",
    },

    participantModel: {
      type: String,
      required: true,
      enum: ["Guest", "User"],
    },
    status: {
      type: [
        {
          type: String,
          lowercase: true,
          trim: true,
        },
      ],
    },
    registeredAt: {
      type: Date,
      required: [true, "Registered date is required"],
      validate: {
        validator: async function (registeredAt) {
          const event = await this.model("Event").findById(this.event);
          if (!event || !event.startDate) {
            throw createHttpError(400, "Event or event date does not exist");
          }
          return dayjs(registeredAt).isBefore(dayjs(event.startDate));
        },
        message: function () {
          return "Registration date must be before the event start date.";
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // include virtuals when object is converted to JSON
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        ret.id = doc.id;

        return ret;
      },
    },
  }
);

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
