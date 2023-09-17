import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
	window.addEventListener("resize", () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});

	return (
		<div className="site-container">
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
