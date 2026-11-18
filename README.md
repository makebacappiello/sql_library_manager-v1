# SQL Library Manager

A web app for managing a library's book collection. You can view all books, add a new book, update a book's details, and delete a book.

## How it was built

- Node.js and Express, started with the Express application generator
- Pug for the page templates
- Sequelize and SQLite for the database (`library.db`)
- Sequelize model validation makes sure every book has a title and an author

## How to run it

1. Download or clone this repo.
2. In the terminal, go to the project folder and run `npm install`.
3. Start the app with `npm start`.
4. Open `http://localhost:3000` in your browser.

## Pages

- `/books` shows the full list of books
- `/books/new` shows the form to add a book
- `/books/:id` shows the form to update or delete a book
