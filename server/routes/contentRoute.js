const router = require("express").Router();
const auth = require("../middleware/auth");
const videoMiddleware = require("../utils/videoMiddleware");
const ContentController = require("../controllers/ContentController");
router.post(
  "/:subid/add-content",
  auth,
  videoMiddleware.single("videos"),
  ContentController.addContent,
  (err, req, res, next) => {
    return res.send({
      success: false,
      message: "Video Not Uploadded",
      err: err.message,
    });
  }
);
router.patch("/status/:cid", auth, ContentController.updateStatus);
router.patch(
  "/modi",
  auth,
  videoMiddleware.single("videos"),
  ContentController.updateContent,
  (err, req, res, next) => {
    return res.send({
      success: false,
      message: "Video Not Uploadded",
      err: err.message,
    });
  }
);
router.delete("/:cid", auth, ContentController.removeVideo);
router.get("/:sid", auth, ContentController.showideos);
router.get("/detail/:cid", auth, ContentController.showSingleVideo);

module.exports = router;
