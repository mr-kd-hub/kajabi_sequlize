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

export default function Courseadd() {
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
          <Typography component="h1" variant="h5">
            Create New Course
          </Typography>
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
              />
              <TextField
                margin="normal"
                variant="outlined"
                margin="normal"
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
    </>
  );
}
