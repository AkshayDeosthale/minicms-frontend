import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

type Anchor = "top" | "left" | "bottom" | "right";

type Props = {
  openListDrawer: () => void;
  closeListDrawer: () => void;
  listDrawerOpen: boolean;
};

export default function BlogListDrawer({
  openListDrawer,
  closeListDrawer,
  listDrawerOpen,
}: Props) {
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: { xs: 300, md: 500 } }}
      role="presentation"
      onClick={closeListDrawer}
      onKeyDown={closeListDrawer}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={listDrawerOpen}
      onClose={closeListDrawer}
      onOpen={openListDrawer}
      disableBackdropTransition
    >
      {list("right")}
    </SwipeableDrawer>
  );
}
