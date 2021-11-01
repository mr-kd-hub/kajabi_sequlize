import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import authAxios from "../../../utils/axios";
import { flowAction } from "../../../redux/reducer/Flowslice";

function Updatesubcourse(props) {
  const id = props.id;
  const [title, setTitle] = useState();
  const [status, setStatus] = useState("Draft");
  const dispatch = useDispatch();
  useEffect(async () => {
    const res = await authAxios.get(`/sub-course/${id}`);
    const { title, status } = res.data.subcourse;
    setTitle(title);
    setStatus(status);
  }, []);
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onStatusChange = (event) => {
    event.target.value === "Publish" ? setStatus(1) : setStatus(0);
  };
  const onSubmitHadler = async (event) => {
    event.preventDefault();
    const detail = { title, status };
    const res = await authAxios.patch(`/sub-course/modi/${id}`, detail);
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
    } else {
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
  return (
    <div>
      {id}
      <Box noValidate sx={{ mt: 1 }}>
        <form onSubmit={onSubmitHadler}>
          <TextField
            margin="normal"
            required
            variant="outlined"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="email"
            autoFocus
            value={title || ""}
            onChange={onTitleChange}
          />

          {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
          <Select
            id="demo-simple-select"
            // value={"Draft"}
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
      </Box>
    </div>
  );
}

export default Updatesubcourse;
