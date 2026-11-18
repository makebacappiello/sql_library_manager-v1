var express = require("express");
var router = express.Router();

// Home route: send anyone who visits "/" to the books list
router.get("/", (req, res) => {
  // runs when the browser requests "/"
  res.redirect("/books"); // redirect the browser to "/books"
});

module.exports = router;
