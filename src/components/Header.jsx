import React from "react";
import { generateColors, hexToHSL } from "../utils.js";

const Header = ({
	generatePalette,
	seedColor,
	setSeedColor,
	mode,
	setMode,
	count,
	setCount,
	colors,
	setColors,
	unlockedColors,
	lockedColors,
}) => {
	const [selectedMode, setSelectedMode] = React.useState("Vibrant");

	/**********************
	 *** Event Handlers ***
	 **********************/

	const handleModeChange = (e) => {
		// This puts the mode in a corresponding format to the functions that use the mode
		const modeToStr = e.target.value.split(" ").join("");
		setMode(modeToStr);
	};

	const handleSeedColorChange = (e) => {
		const hexColor = e.target.value;
		const [h, s, l] = hexToHSL(hexColor);
		setSeedColor({ hue: h, saturation: s, lightness: l });
	};

	return (
		<header>
			<h1>Colour Splash</h1>
			<div className="color-selector">
				<input type="color" onChange={handleSeedColorChange} />
				<select
					value={selectedMode}
					onChange={(e) => {
						setSelectedMode(e.target.value);
						handleModeChange(e); // you can still call this function to handle other logic
					}}
				>
					<option>Random</option>
					<option>Vibrant</option>
					<option>Pastel</option>
					<option>Monochrome</option>
					<option>Dark Monochrome</option>
					<option>Light Monochrome</option>
					<option>Analogous</option>
					<option>Analogous Complementary</option>
					<option>Complementary</option>
					<option>Split Complementary</option>
					<option>Triadic</option>
					<option>Tetradic</option>
				</select>
			</div>
			<button
				className="generate-palette-btn"
				onClick={() => generatePalette()}
			>
				Generate palette!
			</button>
		</header>
	);
};

export default Header;
