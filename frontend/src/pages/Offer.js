import React, { useState } from "react";
import Offeradd from "../components/Offer/Offeradd";
import Offerlist from "../components/Offer/Offerlist";
import Toolbar from "@mui/material/Toolbar";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
const ModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Offer() {
  const [show, setShow] = useState(false);

  const handleModelClose = () => setShow(false);
  const handleModelShow = (idd) => {
    setShow(true);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ width: "100%", display: "flex", "align-items": "self-start" }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleModelShow(1)}
            startIcon={<ControlPointIcon />}
          >
            <span> New Offer</span>
          </Button>
        </Box>
        <Toolbar />
        <Box>
          <Offerlist />
        </Box>
      </Box>
      <Modal
        open={show}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <Offeradd />
        </Box>
      </Modal>
    </div>
  );
}

export default Offer;
