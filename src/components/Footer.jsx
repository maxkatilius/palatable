import React from "react";
import Settings from "./Settings";

import { BiPlus, BiMinus } from "react-icons/bi";

const Footer = ({ colors, generatePalette, setCount, onAdd, onRemove }) => {
	const [selectedMode, setSelectedMode] = React.useState("Vibrant");
	const [lastColorId, setLastColorId] = React.useState(null);

	React.useEffect(() => {
		if (colors.length > 0) {
			setLastColorId(colors[colors.length - 1].id);
		}
	}, [colors]);

	// React.useEffect(() => {
	// 	setLastColor(() => {
	// 		let lastColor;
	// 		for (let i = 0; i < colors.length; i++) {
	// 			if (i === colors.length) {
	// 				lastColor = colors[i];
	// 			}
	// 			return lastColor;
	// 		}
	// 	});
	// }, []);

	return (
		<footer>
			<button
				className="btn generate-palette-btn"
				onClick={() => generatePalette()}
			>
				Generate!
			</button>
			<button
				className="btn remove-color-btn"
				onClick={() => {
					console.log("color removed!");
					if (lastColorId !== null) onRemove(lastColorId);
				}}
			>
				<BiMinus />
			</button>
			<button
				className="btn add-color-btn"
				onClick={() => {
					console.log("color added!");
					if (lastColorId !== null) onAdd(lastColorId);
				}}
			>
				<BiPlus />
			</button>
			<Settings />
		</footer>
	);
};

export default Footer;
