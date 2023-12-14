import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";

const MenuDrawer = ({ open, setOpen }) => {
  let navigate = useNavigate();

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(state);
  };

  const breadcrumbs = ["/employees", "/home"];

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: "250px" }}
    >
      <div>Name</div>
      <Divider />
      <List>
        {["Employees", "Leave Applications"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate(breadcrumbs[index])}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountCircleIcon /> : <SummarizeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
