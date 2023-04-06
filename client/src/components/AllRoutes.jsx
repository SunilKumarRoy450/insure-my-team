import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import PostPage from "../pages/PostPage";
import CreatePostPage from "../pages/CreatePostPage";
import SignUpPage from "../pages/SignUpPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/:id"
        element={
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        }
      />
      <Route path="/create/blog" element={<CreatePostPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default AllRoutes;
