import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import { flowAction } from "../../../redux/reducer/Flowslice";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import authAxios from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";

function Addsubcourse(props) {
  const courseid = props.id;
  const [title, setTitle] = useState();
  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onStatusChange = (event) => {
    event.target.value === "Publish" ? setStatus(1) : setStatus(0);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const detail = {
      title,
      status,
    };
    console.log(status);
    const res = await authAxios.post(
      `/sub-course/${courseid}/add-subcourse/`,
      detail
    );
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
    dispatch(flowAction.setFlow({ courseAdd: res.data }));
    setStatus(0);
    setTitle("");
  };
  return (
    <div>
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
          <Box onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <form>
              <FormControl>
                <TextField
                  margin="normal"
                  required
                  variant="outlined"
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  value={title}
                  onChange={onTitleChange}
                  autoFocus
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
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Addsubcourse;
