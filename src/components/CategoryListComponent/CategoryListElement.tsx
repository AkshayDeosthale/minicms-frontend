import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import { CategoryType } from "../BlogDetailByID.tsx/DetailById";

type Props = {
  category: CategoryType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setActiveCategoryData: React.Dispatch<
    React.SetStateAction<CategoryType | undefined>
  >;
};

const CategoryListElement = ({
  category,
  setIsEdit,
  isEdit,
  setActiveCategoryData,
}: Props) => {
  return (
    <List
      sx={{
        width: "100%",
        ":hover": {
          cursor: "pointer",
          background: "rgba(22, 164, 219, 0.45)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(7.3px)",
          border: "1px solid rgba(22, 164, 219, 1)",
          transition: "background-color 0.5s ease",
        },
      }}
    >
      <ListItem
        onClick={() => {
          setIsEdit(true);
          setActiveCategoryData(category);
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={category.name}
          secondary={
            <Typography variant="body2" sx={{ fontSize: 10 }}>
              Click to edit!
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};

export default CategoryListElement;
