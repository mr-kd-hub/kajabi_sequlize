const Course = require("../models/Course");

//add new course
const addCourse = async (req, res) => {
  try {
    const createdBy = req.currentUser.email;
    if (req.body.title === "" || req.body.description === "")
      return res.send({ message: "Fields are Required..." });
    let thumbnail;
    if (req.file) {
      thumbnail = req.file.path;
    }
    // return console.log(req.file);
    const title = req.body.title;
    const status = req.body.status || 0;
    const description = req.body.description;
    const course = await Course.create({
      title,
      status,
      thumbnail,
      description,
      createdBy,
    });
    if (!course)
      return res.send({ success: false, message: "Course Not Added..." });
    return res.send({ success: true, message: "Course Added...", course });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Add Course...",
      err: err.message,
    });
  }
};
//show all course
const showCourse = async (req, res) => {
  try {
    const course = await Course.findAll();
    if (course.length === 0) return res.send({ success: false });
    return res.send({ success: true, course });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Display Course...",
      err: err.message,
    });
  }
};
//delete course
const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    let createdBy = req.currentUser.email;
    // return res.send({ message: "Course Deleted...", id, createdBy });
    if (!id) return res.send({ message: "No Course Selected" });
    const course = await Course.destroy({
      where: {
        id,
        createdBy,
      },
    });
    if (!course) return res.send({ message: "You Cant Delete this Course..." });
    return res.send({ message: "Course Deleted..." });
  } catch (err) {
    return res.send({
      message: "Error in Delete Course...",
      err: err.message,
    });
  }
};
//update status of course (publish or draft)
const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    let createdBy = req.currentUser.email;

    if (!id) return res.send({ success: false, message: "No Course Selected" });
    const status = req.query.status || 0;
    const course = await Course.update(
      { status },
      { where: { id, createdBy } }
    );
    if (course[0] === 0)
      return res.send({
        success: false,
        message: "You Cant Change Visibility of this Course",
      });
    return res.send({ success: true, message: "Course Status Updated..." });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Update Status...",
      err: err.message,
    });
  }
};
//display course in  update form
const showCourseInUpdateForm = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.send({ success: false, message: "No Course Selected" });
    const course = await Course.findOne({
      where: {
        id,
      },
    });
    if (course.length === 0)
      return res.send({ success: false, message: "Course Not Found..." });
    return res.send(course);
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Update Course...",
      err: err.message,
    });
  }
};
//update course detail
const updateCourse = async (req, res) => {
  try {
    // return res.send(req);
    const id = req.params.id;
    const title = req.body.title;
    const status = req.body.status || 0;
    const description = req.body.description;
    let createdBy = req.currentUser.email;

    //return res.send({ id, title, status, description });
    if (!id) return res.send({ message: "No product Selected" });
    if (title === "" && description === "")
      return res.send({ success: false, message: "Fields are Required..." });
    let thumbnail;
    if (req.file) {
      thumbnail = req.file.path;
    }
    const course = await Course.update(
      { title, thumbnail, status, description },
      { where: { id } }
    );
    if (course[0] === 0)
      return res.send({
        success: false,
        message: "You Cant Update this course...",
      });
    return res.send({ success: true, message: "Course Updated..." });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Update Course...",
      err: err.message,
    });
  }
};
//remove thumbnail
const removeThumnail = async (req, res) => {};
module.exports = {
  showCourse,
  addCourse,
  deleteCourse,
  updateStatus,
  updateCourse,
  showCourseInUpdateForm,
  removeThumnail,
};
