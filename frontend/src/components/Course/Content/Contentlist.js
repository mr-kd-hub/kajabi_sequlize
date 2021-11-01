import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

function Contentlist(props) {
  const subcourseid = props.id;
  return (
    <>
      {subcourseid}
      <Box sx={{ width: "100%", display: "flex", "align-items": "self-start" }}>
        <Button
          color="primary"
          variant="contained"
          // onClick={() => handleCoursModelShow()}
          startIcon={<ControlPointIcon />}
        >
          <span> Add Video</span>
        </Button>
      </Box>
    </>
  );
}

export default Contentlist;
