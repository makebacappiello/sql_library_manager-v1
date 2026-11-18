var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { sequelize } = require("./models"); // import the sequelize instance that the CLI set up in models/index.js

var indexRouter = require("./routes/index");
const booksRouter = require("./routes/books"); // import the books routes

var app = express();

(async () => {
  // an async function that runs immediately
  try {
    await sequelize.sync(); // sync the Book model with the table in library.db
    await sequelize.authenticate(); // test the connection to the database
    console.log("Connection to the database successful!"); // msg shown if the connection works
  } catch (error) {
    // runs only if something in try failed
    console.error("Error connecting to the database: ", error); // connection failure msg
  }
})();

// tell Express where the Pug templates are and to use Pug to render them
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// send any request starting with "/books" to the books router
app.use("/books", booksRouter);

// 404 handler: runs when no route matches the request
app.use((req, res, next) => {
  //middleware for if no earlier route handled request
  const err = new Error(); //create a new Error object
  err.status = 404; //set the status property to 404 (not found)
  err.message = "Sorry! We couldn't find the page you requested."; //a friendly message
  res.status(404).render("page-not-found", { error: err }); // render the page-not-found template and pass the error to it
});

// global error handler: catches any error passed along by the app
app.use((err, req, res, next) => {
  // error-handling middleware (4-part)
  if (!err.status) {
    // Part 1: check if the error has no status yet
    err.status = 500; //if yes then set the status to 500 (server error)
  }
  if (!err.message) {
    // Part 2: check if the error has no message yet
    err.message = "Oops! Something went wrong on the server."; // if yes set friendly message
  }
  console.log(`Error status: ${err.status}`); // Part 3: log the error's status to the console
  console.log(`Error message: ${err.message}`); // log the error's message to the console
  res.status(err.status).render("error", { err }); // Part 4: render the error template and pass err to it
});

module.exports = app;
