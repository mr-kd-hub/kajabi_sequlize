import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Courseadd from "./Courseadd";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";
import "./test.scss";
import Updatecourse from "./Updatecourse";
import Deletecourse from "./Deletecourse";
import { Link } from "react-router-dom";
import { flowAction } from "../../redux/reducer/Flowslice";
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
const Img = styled("img")({
  display: "flex",

  height: "150px",
});
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
export default function Courselist() {
  const [status, setStatus] = useState("Draft");
  useEffect(() => {}, []);
  //add course model
  const [showCourse, setShowCourse] = useState(false);
  const handleCourseModelClose = () => setShowCourse(false);
  const handleCoursModelShow = (idd) => {
    setShowCourse(true);
  };
  //update model
  const [show, setShow] = useState(false);
  const [cid, setCid] = useState();
  const handleModelClose = () => setShow(false);
  const handleModelShow = (idd) => {
    setCid(idd);
    setShow(true);
  };

  //dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //redux
  const dispatch = useDispatch();

  const onDelete = (id) => {
    <Deletecourse id={id} />;
  };
  const onStatuschange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      {/* course add button */}
      <Box sx={{ width: "100%", display: "flex", "align-items": "self-start" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleCoursModelShow(1)}
          startIcon={<ControlPointIcon />}
        >
          <span> New Course</span>
        </Button>
      </Box>
      <Toolbar />
      <Box sx={style} className={"course-container"}>
        <Paper>
          <List>
            <ListItem sx={{ marginTop: "1px" }}>
              <Grid container>
                <Grid item xs={12} lg={3} md={4}>
                  <Img
                    alt="complex"
                    src="https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg"
                  />
                </Grid>
                <Grid item xs={7} md={8} lg={5} className={"title-container"}>
                  <Typography>
                    <Link
                      to=""
                      onClick={() => {
                        dispatch(
                          flowAction.setFlow({
                            show: false,
                            id: 1,
                            subcourse: true,
                          })
                        );
                      }}
                    >
                      Title
                    </Link>
                  </Typography>
                  <Typography>Title</Typography>
                </Grid>
                <Grid item xs={7} md={8} lg={2} className={"title-container"}>
                  <Box>
                    {/* Status */}
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
                  {/* vertical Menu */}
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
                      <Button
                        color="inherit"
                        onClick={() => handleModelShow(1)}
                      >
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
              </Grid>
            </ListItem>
            {/* 2 */}
            <ListItem>
              <Grid container>
                <Grid item xs={12} lg={3} md={4}>
                  <Img
                    alt="complex"
                    src="https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg"
                  />
                </Grid>
                <Grid item xs={7} md={8} lg={5} className={"title-container"}>
                  <Typography>
                    <Link
                      to=""
                      onClick={() => {
                        dispatch(
                          flowAction.setFlow({
                            show: false,
                            id: 1,
                            subcourse: true,
                          })
                        );
                      }}
                    >
                      Title
                    </Link>
                  </Typography>
                  <Typography>Title</Typography>
                </Grid>
                <Grid item xs={7} md={8} lg={2} className={"title-container"}>
                  <Box>
                    {/* Status */}
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
                  {/* vertical Menu */}
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
                      <Button
                        color="inherit"
                        onClick={() => handleModelShow(1)}
                      >
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
              </Grid>
            </ListItem>
          </List>
        </Paper>
      </Box>

      {/* update  model */}
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
          <Updatecourse id={cid} />
        </Box>
      </Modal>
      {/* addcourse model */}
      <Modal
        open={showCourse}
        onClose={handleCourseModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <Courseadd />
        </Box>
      </Modal>
    </>
  );
}
