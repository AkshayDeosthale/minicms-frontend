import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Box, Divider, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommentsType, FormTypes } from "./BlogDetailByID.tsx/DetailById";

type Props = {
  values: FormTypes;
};

export default function Comments({ values }: Props) {
  console.log({ values });
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      {values?.comments?.length === 0 ? (
        <ListItemText primary="Empty" />
      ) : (
        <>
          {values?.comments?.map((item: CommentsType, key) => (
            <>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Box>
                    <Checkbox
                      icon={<DeleteOutlineOutlinedIcon />}
                      checkedIcon={<DeleteIcon sx={{ color: "red" }} />}
                    />
                    <Checkbox
                      edge="end"
                      // onChange={handleToggle(value)}
                      // checked={checked.indexOf(value) !== -1}
                      // inputProps={{ "aria-labelledby": labelId }}
                    />
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>

                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography paddingRight={5}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Velit ducimus officiis ipsum, voluptates nobis,
                        nisi voluptatibus a dolore tempora saepe natus voluptas
                        explicabo autem ab, totam tenetur porro perspiciatis
                        neque! Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Labore repudiandae natus aperiam,
                        animi fuga, non dolorum consectetur delectus veritatis
                        aut, ipsum harum officia! Nostrum ullam voluptatibus
                        fugiat rem maxime aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Amet officia optio error
                        modi officiis odit ducimus, itaque accusantium sit.
                        Illum nesciunt, doloribus error molestias iure eligendi
                        unde iste ab quo.
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </>
      )}
    </List>
  );
}
