import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
	const [navOpen, setNavOpen] = React.useState(false);

	const toggleNav = () => {
		setNavOpen((prevState) => !prevState);
	};
	return (
		<nav className={`nav ${navOpen ? "open" : "closed"}`}>
			<div className="hamburger-container" onClick={toggleNav}>
				<div
					className={`hamburger ${navOpen ? "open" : "closed"}`}
				></div>
			</div>
			<div className={`nav--links ${navOpen ? "open" : "closed"}`}>
				<Link to="/home" className="nav--home">
					Home
				</Link>
				<Link to="/mypalettes" className="nav--mypalettes">
					My Palettes
				</Link>
				<Link to="/popular" className="nav--popular">
					Popular Palettes
				</Link>
				<Link to="/trending" className="nav--trending">
					Trending Palettes
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
