const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const noticeSchema = require("../schemas/noticeSchema");
const userSchema = require("../schemas/userSchema");
const Notice = new mongoose.model("Notice", noticeSchema);
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../middlewares/checkLogin");


// POST A NEWS
router.post("/add", async (req, res) => {

  // user: req.userId

  try {
    const newTodo = new Notice({
      ...req.body,
    });
    const todo = await newTodo.save();
    // await User.updateOne({
    //   _id: req.userId
    // }, {
    //   $push: {
    //     todos: todo._id
    //   }
    // });

    res.status(200).json({
      message: "Notice was inserted successfully!",
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// GET ALL THE TODOS
router.get("/all-news", (req, res) => {
  Notice.find({})
    // .populate("user", "name username -_id")
    // .select({
    //   _id: 0,
    //   __v: 0,
    //   date: 0,
    // })
    // .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});


// GET A TODO by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Notice.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});


// POST MULTIPLE TODO
router.post("/all", (req, res) => {
  Notice.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Notice were inserted successfully!",
      });
    }
  });
});

// PUT TODO
router.put("/:id", (req, res) => {
  const result = Notice.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Notice was updated successfully!",
        });
      }
    }
  );
  console.log(result);
});

// DELETE TODO
router.delete("/:id",(req, res) => {
  Notice.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Notice was deleted successfully!",
      });
    }
  });
});

module.exports = router;
