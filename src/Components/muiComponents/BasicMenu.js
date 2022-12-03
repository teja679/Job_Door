import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { quickList } from "../text/data";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { Grid } from "@mui/material";

export default function BasicMenu() {
  const [state, dispatch] = React.useContext(DarkModeContext);
  const navigate = useNavigate();
  const navigateToPage = (path) => {
    console.log(path);
    navigate(path);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid sx={{ display: { xs: "none", md: "flex" } }}>
      <Button
        sx={{
          color: state.darkMode ? "#fff" : "#111",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        QuickLinks
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {quickList.map((list) => (
          <MenuItem onClick={() => navigateToPage(list.link)}>
            {list.title}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}
