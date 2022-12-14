import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import RestoreIcon from "@mui/icons-material/Restore";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  BottomNavigation,
  BottomNavigationAction,
  Switch,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Person4Icon from "@mui/icons-material/Person4";
import WorkIcon from "@mui/icons-material/Work";
import SmsIcon from "@mui/icons-material/Sms";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { auth } from "../../firebaseConfig";
const pages = [
  {
    label: "Profile",
    key: "profile",
    icon: <AccountCircleIcon />,
  },
  {
    label: "Jobs",
    key: "jobs",
    icon: <WorkIcon />,
  },
  {
    label: "Applications",
    key: "applications",
    icon: <Person4Icon />,
  },
  {
    label: "conversation",
    key: "conversation",
    icon: <SmsIcon />,
  },
];
function CandidateHoc({ children }) {
  const [value, setValue] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, dispatch] = React.useContext(DarkModeContext);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const reRoute = (page) => {
    handleCloseNavMenu();
    navigate(`../candidate/${page}`);
  };
  const logoutFunction = () => {
    localStorage.clear();
    auth.signOut();
    navigate("/");
  };
  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            color: state.darkMode ? "#fff" : "gray",
            bgcolor: state.darkMode ? "#252525" : "#fff",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton
                sx={{
                  display: { xs: "none", md: "block" },
                  color: state.darkMode ? "#fff" : "#111",
                  mr: 1,
                }}
              >
                <img
                  width="50"
                  style={{ borderRadius: "50%" }}
                  src="https://img.favpng.com/3/19/25/search-logo-png-favpng-m99bRGyXRSuw3yU7NMxS9cYqR.jpg"
                  alt="logo"
                />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: 2,
                }}
              >
                Job Door
              </Typography>

              <Box
                sx={{
                  color: state.darkMode ? "#fff" : "gray",
                  bgcolor: state.darkMode ? "#252525" : "#fff",
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    color: "gray",
                    bgcolor: "#fff",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.key}
                      color={state.darkMode ? "#fff" : "gray"}
                      onClick={() => reRoute(page.key)}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box
                sx={{
                  color: state.darkMode ? "#fff" : "gray",
                  bgcolor: state.darkMode ? "#222" : "#fff",
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.key}
                    onClick={() => reRoute(page.key)}
                    sx={{
                      color: state.darkMode ? "#fff" : "gray",
                      bgcolor: state.darkMode ? "#252525" : "#fff",
                      my: 2,
                      display: "block",
                    }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Box>

              <Box
                sx={{
                  flexGrow: 0,
                  color: state.darkMode ? "#fff" : "gray",
                  bgcolor: state.darkMode ? "#252525" : "#fff",
                }}
              >
                <Tooltip title="Open settings">
                  <Switch
                    onChange={() => {
                      state.darkMode
                        ? dispatch({ type: "Make_light" })
                        : dispatch({ type: "Make_dark" });
                    }}
                  />
                </Tooltip>
                <Tooltip>
                  <Button
                    sx={{
                      color: state.darkMode ? "#fff" : "gray",
                      // bgcolor: state.darkMode ? "#252525" : "#fff",
                    }}
                    onClick={logoutFunction}
                  >
                    Logout
                  </Button>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box
        display={{
          xs: "block",
          md: "none",
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "white",
          overflow: "hidden",
          zIndex: "100",
          color: state.darkMode ? "#fff" : "gray",
          bgcolor: state.darkMode ? "#222" : "#fff",
        }}
      >
        <BottomNavigation
          showLabels
          sx={{
            color: state.darkMode ? "#ddd" : "gray",
            bgcolor: state.darkMode ? "#222" : "#fff",
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {pages.map((page) => (
            <BottomNavigationAction
              sx={{
                color: state.darkMode ? "#ddd" : "gray",
                bgcolor: state.darkMode ? "#222" : "#fff",
              }}
              onClick={() => reRoute(page.key)}
              key={page.key}
              label={page.label}
              icon={page.icon}
            />
          ))}
          <IconButton
            sx={{
              color: state.darkMode ? "#ddd" : "gray",
              // bgcolor: state.darkMode ? "#222" : "#fff",
            }}
            onClick={handleClick}
            // label={"Menu"}
          >
            <MoreVertIcon sx={{p:0.5}} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <Tooltip title="Open settings">
                <Switch
                  onChange={() => {
                    state.darkMode
                      ? dispatch({ type: "Make_light" })
                      : dispatch({ type: "Make_dark" });
                  }}
                />
              </Tooltip>
              <Tooltip>
                <Button
                  sx={
                    {
                      // color: state.darkMode ? "#fff" : "gray",
                      // bgcolor: state.darkMode ? "#252525" : "#fff",
                    }
                  }
                  onClick={logoutFunction}
                >
                  Logout
                </Button>
              </Tooltip>
            </div>
          </Menu>
        </BottomNavigation>
      </Box>
      {children}
    </div>
  );
}

export default CandidateHoc;
