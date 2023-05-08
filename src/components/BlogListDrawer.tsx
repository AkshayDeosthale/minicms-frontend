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
import { Avatar, Typography } from "@mui/material";
import axios from "axios";
import { apiUrl } from "./BlogDetail";

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
  const [blogList, setBlogList] = React.useState([]);
  const fetchBlogList = async () => {
    try {
      const res = await axios.get(`${apiUrl}/blogs`);
      setBlogList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchBlogList();
  }, []);

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: { xs: 300, md: 500 }, padding: 2 }}
      role="presentation"
      onClick={closeListDrawer}
      onKeyDown={closeListDrawer}
    >
      <Typography variant="h3" marginBottom={2}>
        Blogs
      </Typography>
      <Divider />
      <List>
        {blogList.map((blog: any, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar>{blog.thumbnailUrl}</Avatar>
              </ListItemIcon>
              <Box>
                <ListItemText primary={blog.title} />
                <ListItemText primary={`By ${blog.author}`} />
              </Box>
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
