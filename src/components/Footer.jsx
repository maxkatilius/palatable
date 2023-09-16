import React from "react";
import Settings from "./Settings";
import { useColorContext } from "../context/ColorContext";

import AddColorBtn from "./AddColorBtn";
import RemoveColorBtn from "./RemoveColorBtn";

const Footer = () => {
	const { generatePalette } = useColorContext();

	return (
		<footer>
			<Settings />
			<RemoveColorBtn />
			<AddColorBtn />
			<button
				className="btn generate-palette-btn"
				onClick={() => generatePalette()}
			>
				Generate!
			</button>
		</footer>
	);
};

export default Footer;
