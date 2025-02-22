const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Guest email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    telephone: {
      type: String,
      trim: true,
    },
    dni: {
      type: String,
      trim: true,
    },
    nie: {
      type: String,
      trim: true,
    },
    passport: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
      trim: true,
      lowercase: true,
    },
    observation: {
      type: String,
      trim: true,
      default: "",
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

module.exports = mongoose.model("Guest", guestSchema);
