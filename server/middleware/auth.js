const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const dotenv = require("dotenv");
const auth = async (req, res, next) => {
  try {
    //get token from client
    const token = req.header("Authorization");
    const decodeUser = jwt.verify(token, process.env.SECRET_KEY);
    const data = await Admin.findOne({ where: { email: decodeUser.email } });
    if (!data) {
      throw new Error();
    }
    req.currentUser = data;
    // req._id = data._id;
    next();
  } catch (err) {
    return res.send({
      success: false,
      message: "Please Login First....",
      err: err.message,
    });
  }
};
module.exports = auth;
