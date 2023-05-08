/* eslint-disable @typescript-eslint/ban-types */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
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
import Comments from "./Comments";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";

type Props = {};

export const apiUrl = import.meta.env.VITE_API_URL;

export type FormTypes = {
  title: string;
  author: string;
  brief: string;
  thumbnailUrl: string;
  slug: string;
  content: string;
  comments: string[];
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

const BlogDetail = (props: Props) => {
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
      const res = await await axios.get(`${apiUrl}/category`);
      setCategoryList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    populateCategory();
  }, []);

  function handleEditorChange(event: any, editor: any) {
    const data = editor.getData();
    setFormdata({ ...formdata, content: data });
  }

  //dropdown

  const handleChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  //on submit
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = async () => {
    setLoading(true);
    const data = { ...formdata, category: category };
    try {
      const res = await axios.post(`${apiUrl}/blogs`, data);
      console.log({ res });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
            <div dangerouslySetInnerHTML={{ __html: formdata.content }} />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Toolbar />

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
          <Typography variant="h2">Create Blog</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="title"
            label="Title"
            variant="filled"
            fullWidth
            onChange={(e) =>
              setFormdata({ ...formdata, title: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="author"
            label="Author"
            variant="filled"
            fullWidth
            onChange={(e) =>
              setFormdata({ ...formdata, author: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="details"
            label="Brief"
            variant="filled"
            fullWidth
            multiline
            rows={4}
            onChange={(e) =>
              setFormdata({ ...formdata, brief: e.target.value })
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="thumbnail"
            label="Thumbnail URL"
            variant="filled"
            fullWidth
            onChange={(e) =>
              setFormdata({ ...formdata, thumbnailUrl: e.target.value })
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="slug"
            label="Slug"
            variant="filled"
            fullWidth
            onChange={(e) => setFormdata({ ...formdata, slug: e.target.value })}
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
            data={formdata.content}
            onChange={handleEditorChange}
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
          <Comments />
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
            onClick={onsubmit}
            loading={loading}
          >
            Save Blog
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogDetail;
