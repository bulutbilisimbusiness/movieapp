import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";

const AppRouter = () => {
  return <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route  path="/" element={<Main />}  />
    <Route  path="/login" element={<Login />}  />
    <Route  path="/register" element={<Register />}  />
    <Route  path="/details/:id" element={<MovieDetail />}  />
  </Routes>
    </BrowserRouter>;
};

export default AppRouter;