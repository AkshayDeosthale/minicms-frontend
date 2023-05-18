import AddIcon from "@mui/icons-material/Add";
import { Avatar, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./BlogDetail";
import DOMPurify from "dompurify";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const navigate = useNavigate();
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

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${apiUrl}/blogs/${id}`);
      fetchBlogList();
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

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
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate(`/blog/create`)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <Box>
            <ListItemText primary="Create Blog" />
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider />
      <List>
        {blogList.map((blog: any, index) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon onClick={() => navigate(`/blog/${blog._id}`)}>
                  <Avatar src={blog.thumbnailUrl} variant="rounded">
                    {blog.thumbnailUrl}
                  </Avatar>
                </ListItemIcon>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box onClick={() => navigate(`/blog/${blog._id}`)}>
                    <ListItemText primary={blog.title} />
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          By {blog.author}
                        </Typography>
                      }
                    />
                  </Box>

                  <IconButton onClick={() => handleDelete(blog._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
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
