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

function Addsubcourse(props) {
  const courseid = props.id;
  return (
    <div>
      {" "}
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl>
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
              />

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
                Create
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Addsubcourse;
