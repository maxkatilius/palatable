import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Link to="/">
				<h1>
					Palette <span>Palooza</span>
				</h1>
			</Link>
			<Nav />
		</header>
	);
};

export default Header;
