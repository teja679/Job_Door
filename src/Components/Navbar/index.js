import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import EngineeringIcon from "@mui/icons-material/Engineering";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { Switch } from "@mui/material";
const pages = [
  { label: "Home", path: "/", bgc: '#999', c: '#fff'},
  { label: "Find Jobs", path: "/candidate/auth",bgc: '#f99d1c', c: '#fff' },
  { label: "Find Candidates", path: "/employer/auth",bgc: '#5ba3d9', c: '#fff' },
  // { label: 'Articles', path: '/articles'},
];
const pages2 = [
  { label: "Log In", path: "/loginIn" },
  { label: "Sign Up", path: "/signUp" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavbarComp() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, dispatch] = React.useContext(DarkModeContext);

  const navigateToPage = (path) => {
    // console.log(path)
    navigate(path);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100, top: 0, 
        color: state.darkMode ? "#fff" : "#111",
        bgcolor: state.darkMode ? "#252525" : "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar container disableGutters>
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => navigateToPage(page.path)}
                >
                  <Typography textAlign="center">{page.label}1</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
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
            Work-Place
          </Typography>
          <Box
            sx={{
              flexGrow: 1, color: '#111',
              textAlign: "center",
              display: { xs: "none", md: "flex" },
              gap: '1rem'
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => navigateToPage(page.path)}
                sx={{
                  my: 2,
                  borderRadius: '0',
                  backgroundColor: `${page.bgc}`,
                  fontFamily: 'roboto',
                  fontWeight: '500',
                  color: `${page.c ? page.c : '#111'}`,
                  display: "block",
                  
                    "&:hover": {
                      color: state.darkMode ? '#fff': '#111'
                    }
                  
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Switch
                value={state.darkMode}
                sx={{
                  color: state.darkMode ? "#fff" : "#111",
                  bgcolor: state.darkMode ? "#222" : "#fff",
                }}
                onChange={() => {
                  state.darkMode
                    ? dispatch({ type: "Make_light" })
                    : dispatch({ type: "Make_dark" });
                }}
              />
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComp;
