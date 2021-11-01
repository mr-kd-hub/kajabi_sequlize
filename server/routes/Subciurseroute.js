const router = require("express").Router();
const SubcourseController = require("../controllers/SubcourseController");
const auth = require("../middleware/auth");
router.post("/:course/add-subcourse", auth, SubcourseController.addSubcourse);
router.patch("/status/:subid", auth, SubcourseController.updateStatus);
router.patch("/modi/:id", auth, SubcourseController.updateSubcourse);
router.get("/:subid", auth, SubcourseController.showCourseInUpdateForm);
router.delete("/:subid", auth, SubcourseController.deleteSubCourse);
router.get("/show/:cid", auth, SubcourseController.showAllSubCourse);

module.exports = router;
