import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route element={<PrivateRouter />}>
					<Route path="/details/:id" element={<MovieDetail />} />
				</Route>
			</Routes>
		</>
	);
};

export default AppRouter;
