import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import authAxios from "../../../utils/axios";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// import authAxios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { flowAction } from "../../../redux/reducer/Flowslice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
// import { flowAction } from "../../redux/reducer/Flowslice";
function Contentadd(props) {
  const id = props.id;
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);
  const [videos, setVideo] = useState();
  const flowState = useSelector((state) => state.flowReducer);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };
  const onStatusChange = (event) => {
    event.target.value === "Publish" ? setStatus(1) : setStatus(0);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    formData.append("videos", videos);
    const res = await authAxios.post(`/content/${id}/add-content`, formData);
    if (res.data.success) {
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVideo("");
      setTitle("");
      setStatus(0);
      dispatch(flowAction.setFlow({ courseAdd: res.data }));
    }
    console.log(title, videos, status);
  };
  return (
    <div>
      {id}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={onSubmit} enctype="multipart/form-data">
            <FormControl>
              <TextField
                value={title}
                onChange={onTitleChange}
                margin="normal"
                required
                variant="outlined"
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
              />
              <TextField
                margin="normal"
                variant="outlined"
                onChange={onVideoChange}
                fullWidth
                name="videos"
                label="video"
                type="file"
                id="videos"
              />

              <Select
                margin="normal"
                variant="outlined"
                id="demo-simple-select"
                value={status ? "Publish" : "Draft"}
                onChange={onStatusChange}
                label="Status"
                fullWidth
                // onChange={handleChange}
              >
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Publish">Publish</MenuItem>
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </FormControl>
          </form>
          {/* </Box> */}
        </Box>
      </Container>
    </div>
  );
}

export default Contentadd;
