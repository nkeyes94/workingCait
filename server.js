// * Importing required packages
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { get } = require("request");

// * App & Port config
const app = express();
const PORT = process.env.PORT || 3001;

// * Middleware config
  // ? Express config
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));
  // ? CORs config
  app.use(cors());

// * Router config
// const routes = require("./routes")(app);

// * Server config cont.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// * Serving up our static content
app.use(express.static("public"))

// * Attempt at correcting the faceAPI shit
app.use(express.static(path.join(__dirname, "/public/webCamFaceRecog")));


// * Establishing connection with MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/heroku_tmwk490b");

// * Server listener
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;

// ******************* Commented out code removed & posted below this line
// const axios = require("axios");
// var passport = require("./config/passport");
// var faceapi = require("face-api.js");

//mlab
// mongodb:
//<jessica>:<cobain1989>@ds333238.mlab.com:33238/heroku_tmwk490b

// ! Placing this down here, as we don't have PP configured yet
// * Passport config
// app.use(session({ secret: "the blue dog jumps over the red moon", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());