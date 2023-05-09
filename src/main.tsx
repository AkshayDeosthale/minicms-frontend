import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetailPage from "./pages/BlogDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "blog/create",
    element: <App />,
  },
  {
    path: "blog/:blogId",
    element: <BlogDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
