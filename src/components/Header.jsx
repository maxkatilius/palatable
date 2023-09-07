import React from "react";

const Header = ({ setMode, setCount, setSeedColor, getColors }) => {
	const handleModeChange = (e) => {
		const modeToStr = e.target.value.toLowerCase().replace(/\s/g, "-");
		setMode(modeToStr);
		console.log(modeToStr);
	};

	const handleSeedColorChange = (e) => {
		console.log(e.target.value);
		const cleanHex = e.target.value.replace("#", "");
		setSeedColor(cleanHex);
	};

	return (
		<header>
			<h1>Colour Splash</h1>
			<div className="color-selector">
				<label htmlFor="color-picker">Choose your seed color</label>
				<input
					type="color"
					name="color-picker"
					defaultValue="#FAA0A0"
					onChange={handleSeedColorChange}
				/>
				<select defaultValue={"Select"} onChange={handleModeChange}>
					<option>Monochrome</option>
					<option>Monochrome Dark</option>
					<option>Monochrome Light</option>
					<option>Analogic</option>
					<option>Complement</option>
					<option>Analogic Complement</option>
					<option>Triad</option>
					<option>Quad</option>
				</select>
				<button onClick={getColors}>Generate palette!</button>
			</div>
		</header>
	);
};

export default Header;
