import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { apiUrl } from "../components/BlogDetailByID.tsx/DetailById";
import { useEffect, useState } from "react";
import { CategoryType } from "../components/BlogDetail";
import axios from "axios";
import CategoryListElement from "../components/CategoryListComponent/CategoryListElement";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const CategoryList = () => {
  const [categoryName, setNategoryName] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const populateCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}/category`);
      setCategoryList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!isEdit) {
      populateCategory();
    }
  }, [isEdit]);

  //modals

  const [activeCategoryData, setActiveCategoryData] = useState<CategoryType>();
  useEffect(() => {
    setNategoryName(activeCategoryData?.name);
  }, [activeCategoryData]);

  const onSubmit = async () => {
    try {
      const res = await axios.patch(
        `${apiUrl}/category/${activeCategoryData?._id}`,
        { ...activeCategoryData, name: categoryName }
      );
      setIsEdit(false);
      console.log(res);
    } catch (error) {
      console.error(error);
      setIsEdit(false);
    }
  };

  const handleClose = () => {
    setIsEdit(false);
    setActiveCategoryData(undefined);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${apiUrl}/category/${activeCategoryData?._id}`
      );
      setIsEdit(false);
      console.log(res);
    } catch (error) {
      console.error(error);
      setIsEdit(false);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${apiUrl}/category/`, {
        name: categoryName,
      });
      setIsEdit(false);
      console.log(res);
    } catch (error) {
      console.error(error);
      setIsEdit(false);
    }
  };

  return (
    <>
      <Dialog fullWidth open={isEdit} onClose={handleClose}>
        <DialogTitle>Add / Edit category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Edit category Name"
            type="text"
            fullWidth
            variant="standard"
            value={categoryName}
            onChange={(e) => setNategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            Click to delete , to cancel click anythere on the screen
          </Button>
          <Button
            onClick={() => {
              if (activeCategoryData) {
                onSubmit();
              } else {
                handleAdd();
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Header />
      <Box
        component={"section"}
        sx={{ width: { xs: "90%", md: "80%" }, mx: "auto", mt: "84px" }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Categories
        </Typography>
        <Grid container spacing={2}>
          {categoryList.map((category, key) => (
            <Grid item xs={12} md={4} key={key}>
              <CategoryListElement
                setActiveCategoryData={setActiveCategoryData}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                category={category}
              />
            </Grid>
          ))}
          <Grid item xs={12} md={4}>
            <List
              onClick={(e) => {
                setActiveCategoryData(undefined);
                setIsEdit(true);
                setNategoryName(undefined);
              }}
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
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ControlPointIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={"Add category"}
                  secondary={
                    <Typography variant="body2" sx={{ fontSize: 10 }}>
                      Click to Add!
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CategoryList;
