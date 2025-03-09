const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    participant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "participantModel",
    },
    participantModel: {
      type: String,
      required: true,
      enum: ["Guest", "User"],
    },
    checkInTime: {
      type: Date,
    },
    status: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["registered", "confirmed", "attended"],
      default: "registered",
    },
    checkInToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        ret.id = doc.id;
        return ret;
      },
    },
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
