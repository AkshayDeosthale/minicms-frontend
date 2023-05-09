import { Box } from "@mui/material";
import DetailById from "../components/BlogDetailByID.tsx/DetailById";
import Header from "../components/Header";

const BlogDetailPage = () => {
  return (
    <Box>
      <Header />
      <DetailById />
    </Box>
  );
};

export default BlogDetailPage;
