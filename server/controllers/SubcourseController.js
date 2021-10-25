const Subcourse = require("../models/Subcourse");
const Course = require("../models/Course");

//add sub course
const addSubcourse = async (req, res) => {
  try {
    const title = req.body.title;
    const status = req.body.status || 0;
    const courseId = req.params.course;
    const currentUser = req.currentUser.email;
    if (!courseId) return res.send({ message: "Course not Selected ..." });
    const course = await Course.findOne({ where: { id: courseId } });
    if (!course) return res.send({ message: "You Can`t Add sub-Course..." });
    if (course.createdBy !== currentUser)
      return res.send({
        message: "You Have Not Rights To Modify this Course",
      });
    // res.send({ Auther: course.createdBy, you: currentUser, course });

    if (title === "")
      return res.send({
        message: "Field Is Required...",
      });
    const subcourse = await course.createSub_course({
      title,
      status,
      createdBy: currentUser,
    });
    if (!subcourse) return res.send({ message: "Sub-Course Not Added..." });
    return res.send({ message: "Sub-Course Added...", subcourse });
  } catch (err) {
    return res.send({ message: "Sub-Course not Added...", err });
  }
};

//update status of subcourse
const updateStatus = async (req, res) => {
  try {
    const id = req.params.subid;
    const currentUser = req.currentUser.email;
    if (!id) return res.send({ message: "No Course Selected" });
    const status = req.query.status || 0;
    const subcourse = await Subcourse.update(
      { status },
      { where: { id, createdBy: currentUser } }
    );
    if (subcourse[0] === 0)
      return res.send({
        message: "You Have Not Rights To Modify Visibility of this Course...",
      });
    return res.send({ message: "Course Status Updated..." });
  } catch (err) {
    return res.send({
      message: "Error in Update Status...",
      err: err.message,
    });
  }
};

//update sub-course
const updateSubcourse = async (req, res) => {
  try {
    // return res.send(req);
    const id = req.body.id;
    const title = req.body.title;
    const status = req.body.status || 0;
    const currentUser = req.currentUser.email;

    if (!id) return res.send({ message: "No product Selected" });
    if (title === "") return res.send({ message: "Fields are Required..." });
    const course = await Subcourse.update(
      { title, status },
      { where: { id, createdBy: currentUser } }
    );
    if (course[0] === 0)
      return res.send({
        message: "You Have Not Rights To Modify this Course...",
        course,
      });
    return res.send({ message: "Course Updated..." });
  } catch (err) {
    return res.send({
      message: "Error in Update Sub-course...",
      err: err.message,
    });
  }
};

//get single course in uodate form
const showCourseInUpdateForm = async (req, res) => {
  try {
    const id = req.params.subid;
    if (!id) return res.send({ message: "No Course Selected" });
    const subcourse = await Subcourse.findAll({
      where: {
        id,
      },
    });
    if (subcourse.length === 0)
      return res.send({ message: "Course Not Found..." });
    return res.send(subcourse);
  } catch (err) {
    return res.send({
      message: "Error in Update Course...",
      err: err.message,
    });
  }
};
//show all sub course
const showAllSubCourse = async (req, res) => {
  try {
    const course = await Subcourse.findAll();
    if (course.length === 0) return res.send({ message: "No Course Found." });
    return res.send(course);
  } catch (err) {
    return res.send({
      message: "Error in Display Course...",
      err: err.message,
    });
  }
};
//delete subcourse
const deleteSubCourse = async (req, res) => {
  try {
    const id = req.params.subid;
    const currentUser = req.currentUser.email;

    if (!id) return res.send({ message: "No sub-Course Selected" });
    const course = await Subcourse.destroy({
      where: {
        id,
        createdBy: currentUser,
      },
    });
    if (!course) return res.send({ message: "You Cant Delete Course..." });
    return res.send({ message: "sub-Course Deleted..." });
  } catch (err) {
    return res.send({
      message: "Error in Delete sub-Course...",
      err: err.message,
    });
  }
};
module.exports = {
  addSubcourse,
  updateStatus,
  updateSubcourse,
  showCourseInUpdateForm,
  showAllSubCourse,
  deleteSubCourse,
};
