import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { flowAction } from "../../redux/reducer/Flowslice";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import authAxios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Img = styled("img")({
  display: "flex",

  height: "150px",
});
function Updatecourse(props) {
  const id = props.id;
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("Draft");
  const [thumbnail, setThumbnail] = useState();
  const [cid, setCid] = useState();
  const [course, setCourse] = useState({});
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onId = (event) => {
    setCid(event.target.value);
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
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("id", cid);
    const res = await authAxios.patch(`/course/modi/${id}`, formData);
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
      dispatch(flowAction.setFlow({ courseAdd: res.data }));
    }
  };
  useEffect(async () => {
    const res = await authAxios.get(`/course/${id}`);
    // console.log(res.data);
    const { title, status, thumbnail, description, cid } = res.data;
    setTitle(title);
    setStatus(status);
    setDescription(description);
    setCid(cid);
    setThumbnail(thumbnail);
    // setCourse(res.data);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} enctype="multipart/form-data">
        <input type="hidden" name="id" onChange={onId} value={id || ""} />

        <TextField
          margin="normal"
          required
          variant="outlined"
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={title || ""}
          onChange={onTitleChange}
        />
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          name="description"
          label="description"
          type="text"
          id="description"
          autoComplete="description"
          onChange={onDescriptionChange}
          value={description || ""}
        />
        {thumbnail ? (
          <>
            <Img
              alt="No Thmbnail"
              src={`${process.env.REACT_APP_HOST}/${thumbnail}` || "data:,"}
            />
          </>
        ) : (
          <></>
        )}

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
          id="demo-simple-select"
          value={"Draft"}
          label="Status"
          fullWidth
          value={status ? "Publish" : "Draft"}
          onChange={onStatusChange}
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
          Update
        </Button>
      </form>
      {/* </Box> */}
    </div>
  );
}

export default Updatecourse;
