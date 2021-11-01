import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import authAxios from "../../../utils/axios";
import { flowAction } from "../../../redux/reducer/Flowslice";
const Img = styled("img")({
  display: "flex",

  height: "150px",
});
function Contentupdate(props) {
  const id = props.id;
  useEffect(async () => {
    const res = await authAxios.get(`/content/detail/${id}`);
    const { title, status, url } = res.data;
    console.log(title, status, url);
  }, []);
  const [title, setTitle] = useState();
  const [video, setVideo] = useState();
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onStatusChange = (event) => {
    event.target.value === "Publish" ? setStatus(1) : setStatus(0);
  };
  const onVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      {id}
      <form onSubmit={onSubmit} enctype="multipart/form-data">
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

        {video ? (
          <>
            <Img
              alt="No Thmbnail"
              src={`${process.env.REACT_APP_HOST}/${video}` || "data:,"}
            />
          </>
        ) : (
          <></>
        )}

        <TextField
          margin="normal"
          variant="outlined"
          onChange={onVideoChange}
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
    </div>
  );
}

export default Contentupdate;
