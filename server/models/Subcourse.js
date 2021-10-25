const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

const Subcourse = sequelize.define(
  "sub_course",
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
module.exports = Subcourse;
