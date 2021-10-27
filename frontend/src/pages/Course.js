import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Courseadd from "../components/Course/Courseadd";
import Courselist from "../components/Course/Courselist";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Subcourselist from "../components/Course/Subcourse/Subcourselist";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import List from "../components/Course/List";
const ModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Course() {
  // const [showCourse, setShowCourse] = useState(false);
  // const handleCourseModelClose = () => setShowCourse(false);
  // const handleCoursModelShow = (idd) => {
  //   setShowCourse(true);
  // };

  return (
    <div>
      <Box>
        {/* <Box
          sx={{ width: "100%", display: "flex", "align-items": "self-start" }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleCoursModelShow(1)}
            startIcon={<ControlPointIcon />}
          >
            <span> New Course</span>
          </Button>
        </Box> */}
        {/* <Toolbar /> */}
        <Box>
          <List />
        </Box>
      </Box>
      {/* <Modal
        open={showCourse}
        onClose={handleCourseModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <Courseadd />
        </Box>
      </Modal> */}
    </div>
  );
}

export default Course;
