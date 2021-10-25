const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
router.post("/admin-reg", AdminController.AdminSignup);
router.post("/admin-login", AdminController.login);
module.exports = router;
