const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
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

// instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
  findActiveCallback: function (cb) {
    return mongoose.model("Todo").find({ status: "active" }, cb);
  },
};

// static methods
todoSchema.statics = {
  findByJS: function () {
    return this.find({ title: /js/i });
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") }); // new RegExp()
  },
};

module.exports = todoSchema;
