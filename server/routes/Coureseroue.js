const router = require("express").Router();
const thumbnailMiddleware = require("../utils/thumbnailMiddlware");
const courseController = require("../controllers/Coursecontroller");
const auth = require("../middleware/auth");
router.get("/all-course", auth, courseController.showCourse);
router.post(
  "/add-course",
  auth,
  thumbnailMiddleware.single("thumbnail"),
  courseController.addCourse,
  (err, req, res, next) => {
    return res.send({
      success: false,
      message: "Thumbnail Not Uploadded",
      err: err.message,
    });
  }
);
router.delete("/:id", auth, courseController.deleteCourse);
router.patch("/status/:id", auth, courseController.updateStatus);
router.get("/:id", auth, courseController.showCourseInUpdateForm);
router.patch(
  "/modi/:id",
  auth,
  thumbnailMiddleware.single("thumbnail"),
  courseController.updateCourse,
  (err, req, res, next) => {
    return res.send({
      success: false,
      message: "Thumbnail Not Uploadded",
      err: err.message,
    });
  }
);

module.exports = router;
