import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Person4Icon from "@mui/icons-material/Person4";
import WorkIcon from "@mui/icons-material/Work";
import SmsIcon from "@mui/icons-material/Sms";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { DarkModeContext } from "../context/DarkMode";
import AdbIcon from "@mui/icons-material/Adb";
import {
  BottomNavigation,
  BottomNavigationAction,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    label: "Applicants",
    key: "applicants",
    icon: <Person4Icon />,
  },
  {
    label: "conversation",
    key: "conversation",
    icon: <SmsIcon />,
  },
];

function EmployerHoc({ children }) {
  const [value, setValue] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, dispatch] = React.useContext(DarkModeContext);
  const navigate = useNavigate();
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
    navigate(`../employer/${page}`);
  };
  const logoutFunction = () => {
    localStorage.clear();
    auth.signOut();
    navigate("/");
  };
  return (
    <div style={{height: '100vh'}}>
      <Box sx={{ display: { xs: "none", md: "block", height: '10vh' } }}>
        <AppBar
          position="fixed"
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

              <Box sx={{ color: state.darkMode ? "#fff" : "gray",
                  bgcolor: state.darkMode ? "#252525" : "#fff",
                  flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.key}
                    color="inherit" onClick={() => reRoute(page.key)}>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <Box
                sx={{
                  color: state.darkMode ? "#fff" : "gray",
                  bgcolor: state.darkMode ? "#222" : "#fff",
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page.key}
                    onClick={() => reRoute(page.key)}
                    sx={{
                      color: state.darkMode ? "#fff" : "gray",
                      // bgcolor: state.darkMode ? "#252525" : "#fff",
                      my: 2,
                      display: "block",
                    }}
                  >
                    {page.label}
                  </Button>
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
                <Tooltip title="Open settings">
                  <Button onClick={logoutFunction}>Logout</Button>
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
          zIndex: "100",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {pages.map((page) => (
            <BottomNavigationAction
              onClick={() => reRoute(page.key)}
              key={page.key}
              label={page.label}
              icon={page.icon}
            />
          ))}
        </BottomNavigation>
      </Box>
      {children}
    </div>
  );
}

export default EmployerHoc;
