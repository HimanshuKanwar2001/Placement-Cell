const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Not Placed"],
      required: true,
    },
    dsa_score: {
      type: Number,
      required: true,
    },
    webdev_score: {
      type: Number,
      required: true,
    },
    react_score: {
      type: Number,
      required: true,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
