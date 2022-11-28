import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import RestoreIcon from "@mui/icons-material/Restore";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
import { auth } from "../../firebaseConfig";
import { DarkModeContext } from "../../App";
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
  const [darkMode, setDarkMode] = React.useContext(DarkModeContext);
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
    console.log(page);
    handleCloseNavMenu();
    navigate(`../candidate/${page}`);
  };
  const logoutFunction = () => {
    localStorage.clear();
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            color: darkMode ? "#fff" : "gray",
            bgcolor: darkMode ? "#252525" : "#fff",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
                }}
              >
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                    color: darkMode ? "#fff" : "gray",
                    bgcolor: darkMode ? "#222" : "#fff",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.key}
                      color="inherit"
                      onClick={() => reRoute(page.key)}
                    >
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
                  color: darkMode ? "#fff" : "gray",
                  bgcolor: darkMode ? "#222" : "#fff",
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.key}
                    onClick={() => reRoute(page.key)}
                    sx={{ my: 2, display: "block", color: darkMode ? "#fff" : "gray",
                    bgcolor: darkMode ? "#222" : "#fff", }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Logout">
                  <Switch
                    value={darkMode}
                    sx={{
                      color: darkMode ? "#fff" : "gray",
                      bgcolor: darkMode ? "#222" : "#fff",
                    }}
                    onClick={() => setDarkMode((p) => !p)}
                  />
                </Tooltip>
                <Tooltip>
                  <Button
                    sx={{
                      color: darkMode ? "#fff" : "gray",
                      bgcolor: darkMode ? "#222" : "#fff",
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
          zIndex: "2",
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
    </>
  );
}

export default CandidateHoc;
