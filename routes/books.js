// import Express so we can create a router
const express = require("express");

// create a router to hold the book routes
const router = express.Router();

// import the Book model so we can read from the database
const { Book } = require("../models");

// The boks route shows the full list of books
// runs when the browser requests "/books"

router.get("/", async (req, res, next) => {
  try {
    //forces a server error so we can test the 500 page (use this line for testing)
    // throw new Error();
    const books = await Book.findAll(); // get each book from the database
    res.render("index", { books }); // render the index template and pass it the list of books
  } catch (error) {
    next(error); // pass the error to the global error handler
  }
});

// New Book route to show the create new book form
// runs when the browser requests "/books/new"
router.get("/new", (req, res) => {
  // render the new-book template with an empty book
  res.render("new-book", { book: {} });
});

//This create Book route saves a new book to the database
// runs when the form is submitted to "/books/new"
router.post("/new", async (req, res, next) => {
  try {
    await Book.create(req.body); // create new book using the data from the form
    res.redirect("/books"); // after saving, send the browser to the books list
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // check if the error came from the validation rules
      const book = Book.build(req.body); // build a new book from the form data to refill the form
      res.render("new-book", {
        // show the new book form again
        book, // pass the book so the inputs keep what the user typed
        errors: error.errors.map((err) => err.message), // pass a list of just the error messages
      });
    } else {
      // any other kind of error
      next(error); // pass it to the global error handler
    }
  }
});

// The book Detail route shows the update form for one book
router.get("/:id", async (req, res, next) => {
  // runs when the browser requests "/books/" plus an id, like "/books/3"
  try {
    const book = await Book.findByPk(req.params.id); // find the book whose id matches the number in the URL
    if (book) {
      // if the book was found
      res.render("update-book", { book }); // show the update-book template and pass it the book
    } else {
      // no book has that id
      next(); // move on, which ends up at the 404 handler
    }
  } catch (error) {
    next(error); // pass the error to the global error handler
  }
});

// The update Book route saves changes to one book
// runs when the update form is submitted to "/books/" plus an id
router.post("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id); // find the book whose id matches the number in the URL
    if (book) {
      // if a book was found
      await book.update(req.body); // update the book with the data from the form
      res.redirect("/books"); // after saving, send the browser to the books list
    } else {
      // no book has that id
      next(); // move on, which ends up at the 404 handler
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // if the error came from validation rules
      const book = Book.build(req.body); // build a bookfrom the form data so we can refill the form
      book.id = req.params.id; // give it the id from the URL so the form posts back to the right book
      res.render("update-book", {
        // show the update form again
        book, // pass the book so the inputs keep what the user typed
        errors: error.errors.map((err) => err.message), // pass a list of just the error messages
      });
    } else {
      // any other kind of error
      next(error); // pass it to the global error handler
    }
  }
});

// the delete Book route removes one book from the database
// runs when a delete form is submitted to "/books/" plus an id plus "/delete"
router.post("/:id/delete", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id); // find the book whose id matches the number in the URL
    if (book) {
      // check if a book was found
      await book.destroy(); // delete the book from the database (this can't be undone)
      res.redirect("/books"); // after deleting, send the browser to the books list
    } else {
      // no book has that id
      next(); // move on, which ends up at the 404 handler
    }
  } catch (error) {
    next(error); // pass the error to the global error handler
  }
});

// export the router so app.js can use it
module.exports = router;
