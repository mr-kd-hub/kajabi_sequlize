const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
// const bcrypt = require("bcrypt");

const Content = sequelize.define(
  "content",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
  },
  { paranoid: true }
);
module.exports = Content;
