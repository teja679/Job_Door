import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu({ page }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // navigateToPage(page.path)
  };
  const CloseMenu = () => {
    setAnchorEl(null);
  };

  return (
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onMouseLeave={CloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {page.map((item, index) => (
          <MenuItem key={index}>{item.label}</MenuItem>
        ))}
      </Menu>
  );
}
