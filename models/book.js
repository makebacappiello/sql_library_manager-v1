"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    // this model has no links to other models, so this method is empty
    static associate(models) {
      // Sequelize calls this method automatically
      // nothing to connect yet
    }
  }
  Book.init(
    {
      title: {
        // object with settings
        type: DataTypes.STRING, // type text
        allowNull: false, // the database won't accept an empty title
        validate: {
          // validation rules for title
          notNull: {
            // rule 1: a title must be provided
            msg: "Title is required", // msg shown when no title is entered
          },
          notEmpty: {
            // rule 2: title can't be empty string
            msg: "Title is required", // msg shown when no title
          },
        },
      },
      author: {
        // object with settings
        type: DataTypes.STRING, // type text
        allowNull: false, // the database won't accept an empty author
        validate: {
          // validation rules for author
          notNull: {
            // rule 1: an author must be provided
            msg: "Author is required", // msg shown when no author is entered
          },
          notEmpty: {
            //rule 2: author can't be empty string
            msg: "Author is required", // msg for when no author is entered
          },
        },
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
