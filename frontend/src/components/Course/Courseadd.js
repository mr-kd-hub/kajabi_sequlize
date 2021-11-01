import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import authAxios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { flowAction } from "../../redux/reducer/Flowslice";
export default function Courseadd() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState(0);
  const [thumbnail, setThumbnail] = useState();
  const flowState = useSelector((state) => state.flowReducer);
  const dispatch = useDispatch();
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);

    const res = await authAxios.post(`/course/add-course`, formData);
    if (res.data) {
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setThumbnail("");
      setTitle("");
      setDescription("");
      setStatus(0);
      dispatch(flowAction.setFlow({ courseAdd: res.data }));
    } else {
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
  };
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };
  const onStatusChange = (event) => {
    event.target.value === "Publish" ? setStatus(1) : setStatus(0);
  };

  return (
    <>
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
          {/* <Typography component="h1" variant="h5">
            Create New Course
          </Typography> */}
          {/* <Box component="form" noValidate sx={{ mt: 1 }}> */}
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
                value={description}
                onChange={onDescriptionChange}
                required
                fullWidth
                name="description"
                label="description"
                type="text"
                id="description"
                autoComplete="description"
              />
              <TextField
                margin="normal"
                variant="outlined"
                onChange={onThumbnailChange}
                fullWidth
                name="thumbnail"
                label="thumbnail"
                type="file"
                id="thumbnail"
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
    </>
  );
}
