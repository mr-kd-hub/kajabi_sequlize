import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Courseadd from "../components/Course/Courseadd";
import Courselist from "../components/Course/Courselist";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Contentlist from "../components/Course/Content/Contentlist";
import { Redirect } from "react-router";
import Subcourselist from "../components/Course/Subcourse/Subcourselist";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import List from "../components/Course/List";
import { useParams } from "react-router";
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

function Course(props) {
  const param = useParams();
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [cmp, setCmp] = React.useState(<Courselist />);
  console.log(props);
  useEffect(() => {
    switch (props.subcmp) {
      case "subcourse":
        {
          authState.token ? (
            setCmp(<Subcourselist id={param.cid} />)
          ) : (
            <Redirect to="/login" />
          );
        }
        return;
      case "content":
        {
          authState.token ? (
            setCmp(<Contentlist id={param.sid} />)
          ) : (
            <Redirect to="/login" />
          );
        }
        return;
    }
  }, [props.subcmp]);

  return (
    <div>
      <Box>
        <Box>{cmp}</Box>
      </Box>
    </div>
  );
}

export default Course;
