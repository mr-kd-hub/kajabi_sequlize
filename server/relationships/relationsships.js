const Course = require("../models/Course");
const Subcourse = require("../models/Subcourse");
const Sequelize = require("sequelize");
const Content = require("../models/Content");
const Relations = () => {
  Course.hasMany(Subcourse);
  Subcourse.belongsTo(Course);
  Subcourse.hasMany(Content);
  Content.belongsTo(Subcourse);
};
module.exports = Relations;
