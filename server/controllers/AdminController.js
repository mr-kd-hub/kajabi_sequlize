const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require("../utils/tokenGenerator");

//admin signup
const AdminSignup = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //return res.send({ name, email, password });
    if (name === "" || email === "" || password === "")
      return res.send({
        success: false,
        message: "All Fields are required...",
      });
    const existance = await Admin.findAll({ where: { email } });
    if (existance.length !== 0)
      return res.send({
        success: false,
        message: "User Alredy exist...",
        existance,
      });

    const hashed = await bcrypt.hash(password, 8);
    const admin = await Admin.create({ email, name, password: hashed });
    if (!admin)
      return res.send({ success: false, message: "Admin Not Registered ... " });
    return res.send({ success: true, message: "Admin registerd...", admin });
  } catch (err) {
    return res.send({ success: false, message: "Somthin Wrong...", err });
  }
};

//admin loging
const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // return res.send({ email, password });
    if (email === "" || password === "")
      return res.send({
        success: false,
        message: "all fields are required...",
      });

    const user = await Admin.findOne({ where: { email } });
    if (user) {
      const hashedPassword = user.password;
      //return res.send(user.password);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (!isMatch)
        return res.send({ success: false, message: "Wrong Credentials..." });
      //generate token
      const token = tokenGenerator(user.email);

      user.toJSON = function () {
        return { email, token };
      };
      return res.send({ success: true, message: "Welcome...", user });
    } else {
      return res.send({ success: false, message: "User Not Found..." });
    }
  } catch (err) {
    return res.send({ success: false, message: "Error in login...", err });
  }
};
module.exports = { AdminSignup, login };
