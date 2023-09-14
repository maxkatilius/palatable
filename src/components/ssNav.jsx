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
				<div className={`hamburger ${navOpen ? "open" : ""}`}></div>
			</div>
			{navOpen && (
				<ul className="nav-links">
					<li>
						<Link to="/mypalettes">My Palettes</Link>
					</li>
					<li>
						<Link to="/popular">Popular Palettes</Link>
					</li>
					<li>
						<Link to="/trending">Trending Palettes</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Nav;
