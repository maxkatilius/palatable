import React from "react";
import { generatePalette, hexToHSL } from "../utils.js";

const Header = ({
	seedColor,
	setSeedColor,
	mode,
	setMode,
	count,
	setCount,
	setColors,
}) => {
	/**********************
	 *** Event Handlers ***
	 **********************/

	const handleModeChange = (e) => {
		// This puts the mode in a corresponding format to the functions that use the mode
		const modeToStr = e.target.value.split(" ").join("");
		setMode(modeToStr);
		console.log(modeToStr);
	};

	const handleSeedColorChange = (e) => {
		const hexColor = e.target.value;
		const [h, s, l] = hexToHSL(hexColor);
		setSeedColor({ hue: h, saturation: s, lightness: l });
		console.log([h, s, l]);
		// 	const hslColor = `hsl(${h}, ${s}%, ${l}%)`;

		// 	setSeedColor(hslColor);
		// 	console.log(hslColor);
	};

	return (
		<header>
			<h1>Colour Splash</h1>
			<div className="color-selector">
				<input type="color" onChange={handleSeedColorChange} />
				<select defaultValue={"Select"} onChange={handleModeChange}>
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
				className="palette-btn"
				onClick={() => {
					setColors(generatePalette(seedColor, mode, count));
				}}
			>
				Generate palette!
			</button>
		</header>
	);
};

export default Header;
