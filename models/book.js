"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
            // rule 1: a author must be provided
            msg: "Author is required", // msg shown when no author   is entered
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
