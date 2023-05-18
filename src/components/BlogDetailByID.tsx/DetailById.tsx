/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import Comments from "../Comments";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type Props = {};
export type CommentsType = {
  userName: string;
  comment: string;
};
export const apiUrl = import.meta.env.VITE_API_URL;

export type FormTypes = {
  title: string;
  author: string;
  brief: string;
  thumbnailUrl: string;
  slug: string;
  content: string;
  comments: CommentsType[];
};

export type CategoryType = {
  assignedBlogs: string[];
  name: string;
  _id: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailById = (props: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  //formdata
  const [category, setCategory] = useState<string>("");
  const [formdata, setFormdata] = useState<FormTypes>({
    title: "",
    author: "",
    brief: "",
    thumbnailUrl: "",
    slug: "",
    content: "",
    comments: [],
  });

  //populate categorylist
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const populateCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}/category`);
      populateBlogDetail();
      setCategoryList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const populateBlogDetail = async () => {
    try {
      const res = await axios.get(`${apiUrl}/blogs/${params.blogId}`);

      setCategory(res.data.category);

      setFormdata({
        title: res.data.title,
        author: res.data.author,
        brief: res.data.brief,
        thumbnailUrl: res.data.thumbnailUrl,
        slug: res.data.slug,
        content: res.data.content,
        comments: res.data.comments,
      });
    } catch (error) {
      navigate("/blog/create");
      console.error(error);
    }
  };
  useEffect(() => {
    populateCategory();
  }, []);

  useEffect(() => {
    populateBlogDetail();
  }, [params.blogId, category]);

  //dropdown

  const handleChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  //category modal
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const handleOpen = () => setOpenAddCategory(true);
  const handleClose = () => setOpenAddCategory(false);
  const onCategorySubmit = async () => {
    try {
      const res = await axios.post(`${apiUrl}/category`, { name: newCategory });
      populateCategory();
      setCategory(res.data._id);
      setOpenAddCategory(false);
    } catch (error) {
      console.error(error);
    }
  };

  //preview dialogue
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleDialogueClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handledialogueClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const data = { ...formdata, category: category };
    try {
      const res = await axios.patch(`${apiUrl}/blogs/${params.blogId}`, data);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{ p: { xs: 1, md: 3 }, width: { xs: "100%", md: "80%" }, mx: "auto" }}
    >
      {/* modal for category */}
      <Modal open={openAddCategory} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <TextField
            variant="filled"
            fullWidth
            label="Name"
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button variant="contained" onClick={onCategorySubmit}>
            Submit
          </Button>
        </Box>
      </Modal>

      {/* dialogue for preview */}
      <Dialog
        open={open}
        onClose={handledialogueClose}
        scroll={scroll}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handledialogueClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Preview
            </Typography>
            <Button autoFocus color="inherit" onClick={handledialogueClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(formdata.content),
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Toolbar />

      <Formik
        initialValues={formdata}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          handleChange,
          setFieldValue,
          handleSubmit,
          handleReset,
          isSubmitting,
        }) => {
          return (
            <Form>
              <Grid
                container
                spacing={2}
                width="100%"
                sx={{
                  textAlign: { xs: "center", md: "start" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  marginLeft: { xs: "-10px !important" },
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="h2">Update Blog</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    variant="filled"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="author"
                    name="author"
                    label="Author"
                    variant="filled"
                    value={values.author}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="brief"
                    name="brief"
                    label="Brief"
                    variant="filled"
                    value={values.brief}
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="thumbnail"
                    name="thumbnail"
                    label="Thumbnail URL"
                    value={values.thumbnailUrl}
                    variant="filled"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="slug"
                    name="slug"
                    label="Slug"
                    variant="filled"
                    value={values.slug}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                      Category
                    </InputLabel>
                    <Select value={category || ""} onChange={handleChange}>
                      {categoryList.map(
                        (category: CategoryType, key: string | number) => (
                          <MenuItem key={key} value={category._id}>
                            {category.name}
                          </MenuItem>
                        )
                      )}
                      <MenuItem onClick={handleOpen}>
                        <em>Add new +</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={12} sx={{ width: "100%" }}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={values.content}
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData();
                      setFieldValue("content", data);
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    onClick={handleDialogueClickOpen("paper")}
                    endIcon={<AspectRatioIcon />}
                  >
                    Preview
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2">Comments</Typography>
                </Grid>
                <Grid item md={12}>
                  <Comments values={values} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    onClick={() => handleSubmit()}
                    loading={isSubmitting}
                  >
                    Save Blog
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default DetailById;
