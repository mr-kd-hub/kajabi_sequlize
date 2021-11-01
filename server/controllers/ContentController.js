const Content = require("../models/Content");
const Subcourse = require("../models/Subcourse");
//add video
const addContent = async (req, res) => {
  try {
    const subid = req.params.subid;
    const title = req.body.title;
    const status = req.body.status || 0;
    const currentUser = req.currentUser.email;

    let videos;
    if (req.file) {
      videos = req.file.path;
    }

    if (title === "" || videos === "")
      return res.send({
        success: false,
        message: "All Fields are Required...",
      });
    const subcourse = await Subcourse.findOne({ where: { id: subid } });

    if (!subcourse)
      return res.send({
        success: false,
        message: "You Can`t Add sub-Course...",
      });
    if (subcourse.createdBy !== currentUser)
      return res.send({
        success: false,
        message: "You Have Not Rights To Modify this Course",
      });
    const content = subcourse.createContent({
      title,
      status,
      url: videos,
      createdBy: currentUser,
    });
    if (content) return res.send({ success: true, message: "Video Added..." });
    return res.send({ success: false, message: "Video Not Added...", content });
  } catch (err) {
    return res.send({
      success: false,
      message: "Video not Added...",
      err: err.message,
    });
  }
};
//update status of video
const updateStatus = async (req, res) => {
  try {
    const id = req.params.cid;
    const currentUser = req.currentUser.email;
    if (!id) return res.send({ success: false, message: "No Course Selected" });
    const status = req.query.status || 0;
    const content = await Content.update(
      { status },
      { where: { id, createdBy: currentUser } }
    );
    if (content[0] === 0)
      return res.send({
        message: "You Have Not Rights To Modify Visibility of this Course...",
      });
    return res.send({ message: "Video Status Updated..." });
  } catch (err) {
    return res.send({
      message: "Error in Update Status...",
      err: err.message,
    });
  }
};
//update contents
const updateContent = async (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const status = req.body.status || 0;
    const currentUser = req.currentUser.email;
    let video = "";
    if (req.file) {
      video = req.file.filename;
    }
    if (title === "" || video === "")
      return res.send({ message: "All Fields are Required..." });
    const content = await Content.update(
      { title, status },
      { where: { id, createdBy: currentUser } }
    );
    if (content[0] === 0)
      return res.send({
        message: "You Have Not Rights To Modify this Course...",
        course,
      });
    return res.send({ message: "Course Updated..." });
  } catch (err) {
    return res.send({
      message: "Error in Update Content...",
      err: err.message,
    });
  }
};
//delete content
const removeVideo = async (req, res) => {
  try {
    const id = req.params.cid;
    const currentUser = req.currentUser.email;
    if (!id) return res.send({ success: false, message: "No Video Selected" });
    const content = await Content.destroy({
      where: {
        id,
        createdBy: currentUser,
      },
    });
    if (!content)
      return res.send({ success: false, message: "You Cant Delete Video..." });
    return res.send({ success: true, message: "Video Deleted..." });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Delete Video...",
      err: err.message,
    });
  }
};
//show all videos
const showideos = async (req, res) => {
  try {
    const subCourseId = req.params.sid;
    const course = await Content.findAll({ where: { subCourseId } });
    if (course.length === 0)
      return res.send({ success: false, message: "No Videos Found." });
    return res.send({ success: true, course });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Display Videos...",
      err: err.message,
    });
  }
};
//disply single vido
const showSingleVideo = async (req, res) => {
  try {
    const id = req.params.cid;
    if (!id) return res.send({ success: false, message: "No Video Selected" });
    const video = await Content.findAll({
      where: {
        id,
      },
    });
    if (video.length === 0)
      return res.send({
        success: false,
        message: "Course Not Found...",
        video,
      });
    return res.send({ success: true, video });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Show Video...",
      err: err.message,
    });
  }
};
module.exports = {
  addContent,
  updateStatus,
  updateContent,
  removeVideo,
  showideos,
  showSingleVideo,
};
