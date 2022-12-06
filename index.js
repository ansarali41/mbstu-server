const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/newsHandler");
const noticeHandler = require("./routeHandler/noticeHandler");
const userHandler = require("./routeHandler/userHandler");
const cors = require('cors');

// express app initialization
const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())

//check health
app.get('/',(req, res) => {
    res.send('home')
})
// database connection with mongoose
mongoose
  .connect("mongodb://localhost/mbstuWeb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/news", todoHandler);
app.use("/notice", noticeHandler);
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler);

app.listen(4000, () => {
  console.log("app listening at port 4000");
});
