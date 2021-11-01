import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Contentadd from "./Contentadd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Modal from "@mui/material/Modal";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Contentupdate from "./Contentupdate";
import Contentdelete from "./Contentdelete";
import { useDispatch, useSelector } from "react-redux";
import { flowAction } from "../../../redux/reducer/Flowslice";
import authAxios from "../../../utils/axios";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
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

const style = {
  width: "100%",
  flexGrow: 1,
};
function Contentlist(props) {
  const subcourseid = props.id;
  const dispatch = useDispatch();
  const flowState = useSelector((state) => state.flowReducer);
  const [dense, setDense] = React.useState(false);
  const [show, setShow] = useState(false);
  const [cid, setCid] = useState();
  const [courses, setCourse] = useState([]);
  useEffect(async () => {
    const res = await authAxios.get(`/content/${subcourseid}`);
    if (!res.data.success) {
      toast.error(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setCourse(res.data.course);
  }, [flowState]);
  //add course model
  const [showCourse, setShowCourse] = useState(false);
  const handleCourseModelClose = () => setShowCourse(false);
  const handleCoursModelShow = (id) => {
    setCid(id);
    setShowCourse(true);
  };
  const onDelete = async (id) => {
    let flag;
    if (window.confirm(`Are You Sure?`)) {
      flag = await Contentdelete(id);
      console.log(flag);
      dispatch(flowAction.setFlow({ courseAdd: flag }));
    }
  };
  // const [subCourse, setSubcourse] = useState({ show: false, id: 0 });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = React.useState(null);
  // const flow = useSelector((state) => state.flowReducer);
  const open = Boolean(anchorEl);
  const handleModelClose = () => setShow(false);
  const handleModelShow = (idd) => {
    setCid(idd);
    setShow(true);
  };
  const handleClick = (event) => {
    setClicked(event.target.value);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {subcourseid}

      <Box sx={{ width: "100%", display: "flex", "align-items": "self-start" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleCoursModelShow(subcourseid)}
          startIcon={<ControlPointIcon />}
        >
          <span> Add Video</span>
        </Button>
      </Box>
      <Toolbar />
      <Demo>
        <Box sx={style} className={"course-container"}>
          <List dense={dense}>
            {courses &&
              courses.map((i) => {
                return (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <video width="200" height="100" autoplay>
                          <source
                            src={`${process.env.REACT_APP_HOST}/${i.url}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </ListItemAvatar>

                      <ListItemText>
                        <Link to={`/course/subcourse/${i.id}`}>{i.title}</Link>
                      </ListItemText>

                      <Grid
                        item
                        xs={7}
                        md={8}
                        lg={2}
                        className={"title-container"}
                      >
                        <Box>
                          <Typography>
                            {i.status ? "Published" : "Draft"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        lg={2}
                        className={"sub-title-container"}
                      >
                        <Button
                          id="basic-button"
                          aria-controls="basic-menu"
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          value={i.id}
                        >
                          <MoreVertIcon
                            fontSize="large"
                            style={{ pointerEvents: "none" }}
                          />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClose={handleClose}>
                            <Button
                              color="inherit"
                              onClick={() => handleModelShow(clicked)}
                            >
                              Edit
                            </Button>
                          </MenuItem>
                          <MenuItem onClose={handleClose}>
                            <Button
                              color="inherit"
                              onClick={() => onDelete(clicked)}
                            >
                              Delete{" "}
                            </Button>
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </ListItem>
                  </>
                );
              })}

            <Divider />
          </List>
        </Box>
      </Demo>
      <Modal
        open={show}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modify Details
          </Typography>
          <Contentupdate id={cid} />
        </Box>
      </Modal>

      <Modal
        open={showCourse}
        onClose={handleCourseModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Sub Course
          </Typography>
          <Contentadd id={cid} />
        </Box>
      </Modal>
    </>
  );
}

export default Contentlist;
