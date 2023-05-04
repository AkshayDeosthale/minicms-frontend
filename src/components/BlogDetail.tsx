/* eslint-disable @typescript-eslint/ban-types */
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Comments from "./Comments";

type Props = {};

const BlogDetail = (props: Props) => {
  const [editorData, setEditorData] = React.useState("");
  function handleEditorChange(event: any, editor: any) {
    const data = editor.getData();
    setEditorData(data);
  }

  //dropdown
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box
      component="main"
      sx={{ p: { xs: 1, md: 3 }, width: { xs: "100%", md: "80%" }, mx: "auto" }}
    >
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
          <TextField id="title" label="Title" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="author" label="Author" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="details"
            label="Brief"
            variant="filled"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="thumbnail"
            label="Thumbnail URL"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField id="slug" label="Slug" variant="filled" fullWidth />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              <MenuItem value="">
                <em>Add new +</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sx={{ width: "100%" }}>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
          />
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
          <Button variant="contained">Save Blog</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogDetail;
