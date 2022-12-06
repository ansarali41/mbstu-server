const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const userSchema = require("../schemas/userSchema");
const News = new mongoose.model("News", todoSchema);
const User = new mongoose.model("User", userSchema);
const fs = require("fs");
const checkLogin = require("../middlewares/checkLogin");

// POST A NEWS
router.post("/add", async (req, res) => {

  // user: req.userId

  try {
    const newTodo = new News({
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
      message: "News was inserted successfully!",
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
  News.find({})
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
    const data = await News.find({ _id: req.params.id });
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
  News.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "News were inserted successfully!",
      });
    }
  });
});

// PUT TODO
router.put("/:id", checkLogin, (req, res) => {
  const result = News.findByIdAndUpdate(
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
          message: "News was updated successfully!",
        });
      }
    }
  );
  console.log(result);
});

// DELETE TODO
router.delete("/:id", checkLogin,(req, res) => {
  News.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "News was deleted successfully!",
      });
    }
  });
});

module.exports = router;
