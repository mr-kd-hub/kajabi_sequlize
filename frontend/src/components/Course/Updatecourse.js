import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Updatecourse(props) {
  const id = props.id;
  return (
    <div>
      <Box
        component="form"
        // onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
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
          // value={email || ""}
          // onChange={onEmailChange}
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
          // onChange={onPasswordChange}
          value={id || ""}
        />
        <TextField
          margin="normal"
          variant="outlined"
          // required
          margin="normal"
          fullWidth
          name="thumbnail"
          label="thumbnail"
          type="file"
          id="thumbnail"
          // autoComplete="thumbnail"
          // onChange={onPasswordChange}
          // value={password || ""}
        />
        {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
        <Select
          id="demo-simple-select"
          value={"Draft"}
          label="Status"
          fullWidth
          // onChange={handleChange}
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Publist">Publist</MenuItem>
        </Select>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </div>
  );
}

export default Updatecourse;
