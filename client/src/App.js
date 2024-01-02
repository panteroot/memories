import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

// components
import Navbar from "./components/Navbar/Navbar";

// pages
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PostDetails from "./pages/PostDetails/PostDetails";

import { useAuthContext } from "./useContext/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
      <Container maxWidth="lg">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              element={<Navigate to="/posts" />}
              path="/"
            />
            <Route
              element={<Home />}
              path="/posts"
            />
            <Route
              element={<Home />}
              path="/posts/search"
            />
            <Route
              element={<PostDetails />}
              path="/posts/:id"
            />
            <Route
              element={!user? <Auth /> : <Navigate to="/posts" />}
              path="/auth" 
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
