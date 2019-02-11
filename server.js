const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");
const winston = require("./config/winston");
const morgan = require("morgan");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(morgan('combined', { stream: winston.stream }));


app.use(bodyParser.json());
const db = require("./config/projectkeys").mongoURI;


mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => winston.info("MongoDB is Successfully connected!"))
  .catch(err => winston.err(err));

  app.use(passport.initialize());
  require("./config/passport")(passport);
  app.use("/api/users", users);

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server is up and running on port ${port} !`));