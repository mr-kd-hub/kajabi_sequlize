import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";

import "./test.scss";
import Updatecourse from "./Updatecourse";

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

export default function Courselist() {
  const [status, setStatus] = useState("Draft");
  const [show, setShow] = useState(false);
  const [cid, setCid] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleModelClose = () => setShow(false);
  const handleModelShow = (idd) => {
    //  console.log(idd);
    setCid(idd);
    setShow(true);
  };
  const onDelete = (id) => {
    console.log(id);
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
      <Box sx={style} className={"course-container"}>
        <Paper elevation={3}>
          <Grid container>
            <Grid item xs={12} lg={3} md={4}>
              <Img
                alt="complex"
                src="https://cdn.pixabay.com/photo/2021/10/13/15/09/water-6706894_960_720.jpg"
              />
            </Grid>
            <Grid item xs={7} md={8} lg={5} className={"title-container"}>
              <Typography>Title</Typography>
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
                <MenuItem>
                  <Button color="inherit" onClick={() => handleModelShow(1)}>
                    Edit
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="inherit" onClick={() => onDelete(1)}>
                    Delete{" "}
                  </Button>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Paper>
      </Box>{" "}
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
    </>
  );
}
