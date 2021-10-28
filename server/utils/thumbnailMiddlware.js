//multer specific middleware
const multer = require("multer");
// const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(undefined, "./thumbnails/");
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
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/)) {
    return cb(new Error("Not Valide Formate..."));
  }
  cb(undefined, true);
};
const thumbnailMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: fileFilter,
});
module.exports = thumbnailMiddleware;
// {
//   dest: "./thumbnails/",
//   limits: {
//     fileSize: 5000000, //1mb
//   },
//   fileFilter(req, file, cb) {
//     if () {
//       return cb(new Error("Not Valide Formate..."));
//     }
//     cb(undefined, true);
//   },
// }
