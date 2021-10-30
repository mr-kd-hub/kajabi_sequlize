import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";
import ListItemIcon from "@mui/material/ListItemIcon";
import Subcourseadd from "./Addsubcourse";
import "../test.scss";
// import Updatecourse from "./Updatecourse";
// import Deletecourse from "./Deletecourse";
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
  const state = useSelector((state) => state.flowReducer);
  const subcourseid = props.id;
  // const courseid = state.id; //from parent
  const [dense, setDense] = React.useState(false);
  const [status, setStatus] = useState("Draft");
  const [show, setShow] = useState(false);
  const [cid, setCid] = useState();
  //add course model
  const [showCourse, setShowCourse] = useState(false);
  const handleCourseModelClose = () => setShowCourse(false);
  const handleCoursModelShow = () => {
    setShowCourse(true);
  };
  // const [subCourse, setSubcourse] = useState({ show: false, id: 0 });
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const flow = useSelector((state) => state.flowReducer);
  const dispatch = useDispatch();
  const handleModelClose = () => setShow(false);
  const handleModelShow = (idd) => {
    setCid(idd);
    setShow(true);
  };
  const onDelete = (id) => {
    <Deletesubcourse id={id} />;
  };
  const onStatuschange = (event) => {
    setStatus(event.target.value);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
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
          onClick={() => handleCoursModelShow()}
          startIcon={<ControlPointIcon />}
        >
          <span> New Sub-Course</span>
        </Button>
      </Box>
      <Toolbar />
      <Demo>
        <Box sx={style} className={"course-container"}>
          <List dense={dense}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText>
                <Link to="/course/subcourse/1">Single-line item</Link>
              </ListItemText>
              {/* <Link to="/subcourse/1">
                <ListItemText
                  primary="Single-line item"
                  // onClick={() => {
                  //   dispatch(
                  //     flowAction.setFlow({
                  //       show: true,
                  //       id: subcourseid,
                  //       subcourse: false,
                  //     })
                  //   );
                  // }}
                />
              </Link> */}

              <Grid item xs={7} md={8} lg={2} className={"title-container"}>
                <Box>
                  <Select
                    onChange={onStatuschange}
                    name="status"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    fullWidth
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Publist">Publist</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={2} lg={2} className={"sub-title-container"}>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon fontSize="large" />
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
                    <Button color="inherit" onClick={() => handleModelShow(1)}>
                      Edit
                    </Button>
                  </MenuItem>
                  <MenuItem onClose={handleClose}>
                    <Button color="inherit" onClick={() => onDelete(1)}>
                      Delete{" "}
                    </Button>
                  </MenuItem>
                </Menu>
              </Grid>
            </ListItem>
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
          <Addsubcourse id="1" />
        </Box>
      </Modal>
    </>
  );
}
