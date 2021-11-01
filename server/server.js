const express = require("express");
const sequelize = require("./db/connection");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;
const Courseroute = require("./routes/Coureseroue");
const Subcourseroute = require("./routes/Subciurseroute");
const AdminRoute = require("./routes/adminRoute");
const ContentRoute = require("./routes/contentRoute");
const Relations = require("./relationships/relationsships");

dotenv.config({ path: "./.env" });
sequelize
  .authenticate()
  .then(async () => {
    try {
      Relations();
      await sequelize.sync({ alter: true });
      console.log("Database connected");
    } catch (err) {
      console.log("Error in sync" + err);
    }
  })
  .catch((err) => {
    console.log("Something Wrong In Databse connection : " + err);
  });
const app = express();
app.use("/thumbnails", express.static("thumbnails"));
app.use("/videos", express.static("videos"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/course", Courseroute);
app.use("/sub-course", Subcourseroute);
app.use("/admin", AdminRoute);
app.use("/content", ContentRoute);
app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
