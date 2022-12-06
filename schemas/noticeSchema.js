const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
    {
      title: {
        type: String,

      },
      description: String,
      image: String,
      pdf: String,
      date: {
        type: Date,
        default: Date.now,
      },
      user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
      }
    },
    {
      timestamps: true,
    }
);

module.exports = noticeSchema;
