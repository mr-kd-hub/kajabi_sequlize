import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";
import ListItemIcon from "@mui/material/ListItemIcon";
import Subcourseadd from "./Addsubcourse";
import "../test.scss";
import authAxios from "../../../utils/axios";
import { Link } from "react-router-dom";
import Updatesubcourse from "./Updatesubcourse";
import { flowAction } from "../../../redux/reducer/Flowslice";
import Deletesubcourse from "./Deletesubcourse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Divider } from "@mui/material";
import Addsubcourse from "./Addsubcourse";
const style = {
  width: "100%",
  flexGrow: 1,
};
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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
export default function Subcourselist(props) {
  const params = useParams();
  const subcourseid = params.cid;
  const flowState = useSelector((state) => state.flowReducer);
  const dispatch = useDispatch();
  const [subCourse, setSubCourse] = useState([]);
  // const [isDeleted, setIsDeleted] = useState(null);

  useEffect(async () => {
    const res = await authAxios.get(`/sub-course/show/${subcourseid}`);

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
    setSubCourse(res.data.course);
  }, [flowState]);

  const [dense, setDense] = React.useState(false);
  const [status, setStatus] = useState("Draft");
  const [show, setShow] = useState(false);
  const [cid, setCid] = useState();
  //add course model
  const [showCourse, setShowCourse] = useState(false);
  const handleCourseModelClose = () => setShowCourse(false);
  const handleCoursModelShow = (id) => {
    setCid(id);
    setShowCourse(true);
  };
  // const [subCourse, setSubcourse] = useState({ show: false, id: 0 });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = React.useState(null);
  // const flow = useSelector((state) => state.flowReducer);

  const handleModelClose = () => setShow(false);
  const handleModelShow = (idd) => {
    setCid(idd);
    setShow(true);
  };
  const onDelete = async (id) => {
    // <Deletesubcourse id={id} />;
    let flag;
    if (window.confirm(`Are You Sure?${id}`)) {
      flag = await Deletesubcourse(id);
      // setIsDeleted(flag);
      dispatch(flowAction.setFlow({ courseAdd: flag }));
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setClicked(event.target.value);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", "align-items": "self-start" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleCoursModelShow(subcourseid)}
          startIcon={<ControlPointIcon />}
        >
          <span> New Sub-Course</span>
        </Button>
      </Box>
      <Toolbar />
      <Demo>
        <Box sx={style} className={"course-container"}>
          <List dense={dense}>
            {(subCourse &&
              subCourse.map((i) => {
                return (
                  <>
                    {" "}
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
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
                    <Divider />
                  </>
                );
              })) ||
              "No Course Found"}
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
          <Updatesubcourse id={cid} />
        </Box>
      </Modal>
      {/* add sub-course model */}
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
          <Addsubcourse id={cid} />
        </Box>
      </Modal>
    </>
  );
}
