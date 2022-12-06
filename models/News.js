const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {data: Buffer, contentType: String},
    pdf: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
