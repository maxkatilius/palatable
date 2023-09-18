import React from "react";
import { Link } from "react-router-dom";
import { useOverlayContext } from "../context/OverlayContext";

const Nav = () => {
	const { navOpen, setNavOpen, settingsOpen } = useOverlayContext();

	const toggleNav = () => {
		setNavOpen((prevState) => !prevState);
	};

	return (
		<nav className={`nav ${navOpen ? "open" : "closed"}`}>
			<div
				className={`hamburger-container ${
					settingsOpen ? "behind" : ""
				}`}
				onClick={toggleNav}
			>
				<div
					className={`hamburger ${settingsOpen ? "behind" : ""}`}
				></div>
			</div>
			<div className="nav--links flex-col">
				<Link
					to="/"
					className="nav--generator"
					onClick={() => {
						toggleNav();
					}}
				>
					palette Generator
				</Link>
				<Link
					to="/my-palettes"
					className="nav--mypalettes"
					onClick={() => {
						toggleNav();
					}}
				>
					My Palettes
				</Link>
				<Link
					to="/popular"
					className="nav--popular"
					onClick={() => {
						toggleNav();
					}}
				>
					Popular Palettes
				</Link>
				<Link
					to="/trending"
					className="nav--trending"
					onClick={() => {
						toggleNav();
					}}
				>
					Trending Palettes
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
