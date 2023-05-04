import { Box, Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BlogDetail from "./components/BlogDetail";
import Comments from "./components/Comments";

function App() {
  return (
    <Box>
      <Header />

      <BlogDetail />
    </Box>
  );
}

export default App;
