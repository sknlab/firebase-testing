import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "@/modules/Auth/Login";
import PrivateRoute from "@/modules/Auth/PrivateRoute";
import Layout from "@/modules/Layout/Layout";

const AllBlogs = React.lazy(() => import("@/modules/Blogs/AllBlogs"));
const MyBlogs = React.lazy(() => import("@/modules/Blogs/MyBlogs"));
const Article = React.lazy(() => import("@/modules/Blogs/Article"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Layout>{null}</Layout>}>
        <Routes>
          <Route path="/" element={<PrivateRoute component={AllBlogs} />} />
          <Route path="/my-blogs" element={<PrivateRoute component={MyBlogs} />} />
          <Route path="/article/:id" element={<PrivateRoute component={Article} />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
