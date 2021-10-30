const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

const Course = sequelize.define(
  "course",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: Sequelize.NULL,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
  },
  { paranoid: false }
);
module.exports = Course;
