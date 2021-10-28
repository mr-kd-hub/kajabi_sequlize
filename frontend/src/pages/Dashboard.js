import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Redirect } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Home from "./Home";
import Course from "./Course";
import { useDispatch, useSelector } from "react-redux";
import Offer from "./Offer";
import Customer from "./Customer";
import Coupan from "./Coupan";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { authAction } from "../redux/reducer/authSlice";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard(props) {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [cmp, setCmp] = React.useState(<Home />);

  useEffect(() => {
    switch (props.cmpName) {
      case "home":
        {
          authState.token ? setCmp(<Home />) : <Redirect to="/login" />;
        }
        return;
      case "course":
        {
          authState.token ? setCmp(<Course />) : <Redirect to="/login" />;
        }

        return;
      case "offer":
        {
          authState.token ? setCmp(<Offer />) : <Redirect to="/login" />;
        }

        return;
      case "customer":
        {
          authState.token ? setCmp(<Customer />) : <Redirect to="/login" />;
        }
        return;

      case "coupan":
        {
          authState.token ? setCmp(<Coupan />) : <Redirect to="/login" />;
        }
        return;

      default:
        {
          authState.token ? setCmp(<Home />) : <Redirect to="/login" />;
        }

        return;
    }
  }, [props.cmpName]);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Kajabi
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <div>
              <Link to={"/"}>
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>
              <Link to={`/course`}>
                <ListItem button>
                  {" "}
                  <ListItemIcon>
                    <OndemandVideoIcon />
                  </ListItemIcon>
                  <ListItemText primary="Course" />
                </ListItem>
              </Link>
              <Link to={`/offer`}>
                <ListItem button>
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText primary="Offers" />
                </ListItem>
              </Link>
              <Link to={`/coupan`}>
                <ListItem button>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Coupans" />
                </ListItem>
              </Link>
              <Link to="/customer">
                <ListItem button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Customers" />
                </ListItem>
              </Link>
              <ListItem
                button
                onClick={() => {
                  dispatch(authAction.logout());
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
          <Divider />
          <List></List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {cmp}
          </Container>
        </Box>
      </Box>
    </>
  );
}
