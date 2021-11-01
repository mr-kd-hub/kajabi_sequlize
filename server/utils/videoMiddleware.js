const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(undefined, "./videos/");
  },
  filename: function (req, file, cb) {
    cb(
      undefined,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(new Error("Not Valide Formate..."));
  }
  cb(undefined, true);
};
const videoMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
});
module.exports = videoMiddleware;
