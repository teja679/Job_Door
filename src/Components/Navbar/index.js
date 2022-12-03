import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { Switch } from "@mui/material";
import { pages } from "../text/data";
import BasicMenu from "../muiComponents/BasicMenu";

function NavbarComp() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, dispatch] = React.useContext(DarkModeContext);
 
  const navigate = useNavigate();
  const navigateToPage = (path) => {
    navigate(path);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // navigateToPage(page.path)
  };
  const CloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };
  console.log(state)
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100,
        top: 0,
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
              marginLeft: 0,
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
                  <Typography textAlign="center">{page.label}</Typography>
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
           Job Door
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: "center",
              display: { xs: "none", md: "flex" },
              gap: "1rem",
              color: state.darkMode ? "#fff" : "#111",
              bgcolor: state.darkMode ? "#252525" : "#fff",
            }}
          >
            {pages.map((page) => (
              <div key={page.label}>
                <Button
                  key={page.label}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => navigateToPage(page.path)}
                  sx={{
                    color: state.darkMode ? "#fff" : "#111",

                    my: 2,
                    borderRadius: "0",
                    // backgroundColor: `${page.bgc}`,
                    fontFamily: "roboto",
                    fontWeight: "500",
                    // color: `${page.c ? page.c : "#111"}`,
                    display: "block",

                    "&:hover": {
                      // color: state.darkMode ? "#fff" : "#111",
                    },
                  }}
                >
                  {page.label}
                </Button>
              </div>
            ))}
          </Box>

          <BasicMenu />
          <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComp;
