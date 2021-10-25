//multer specific middleware
const multer = require("multer");
// const path = require("path");
const videoMiddleware = multer({
  dest: "./videos",
  //   limits: {
  //     fileSize: 5000000, //1mb
  //   },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4)$/)) {
      return cb(new Error("Not Valide Formate..."));
    }
    cb(undefined, true);
  },
});
module.exports = videoMiddleware;
